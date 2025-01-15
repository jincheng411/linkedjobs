import axios from 'axios';

export class LinkedInAPI {
  constructor(clientId, clientSecret) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.accessToken = null;
    this.baseUrl = 'https://api.linkedin.com/v2';
  }

  async authenticate() {
    try {
      const response = await axios.post('https://www.linkedin.com/oauth/v2/accessToken', null, {
        params: {
          grant_type: 'client_credentials',
          client_id: this.clientId,
          client_secret: this.clientSecret
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });

      this.accessToken = response.data.access_token;
    } catch (error) {
      console.error('Authentication error:', error.response?.data || error.message);
      throw error;
    }
  }

  async getJobListings() {
    if (!this.accessToken) {
      throw new Error('Not authenticated. Call authenticate() first.');
    }

    try {
      // Using LinkedIn Jobs Search API
      // Documentation: https://learn.microsoft.com/en-us/linkedin/consumer/integrations/self-serve/jobs-search
      const response = await axios.get(`${this.baseUrl}/jobSearch`, {
        headers: {
          'Authorization': `Bearer ${this.accessToken}`,
          'X-Restli-Protocol-Version': '2.0.0'
        },
        params: {
          // Customize these parameters based on your needs
          keywords: 'software engineer',
          location: 'United States',
          locationId: 'us:0',
          start: 0,
          count: 10,
          // Add filters for posted time if needed
          timePosted: 'past-24-hours'
        }
      });

      // Transform the LinkedIn response to our expected format
      return response.data.elements.map(job => ({
        id: job.jobPosting.id,
        title: job.jobPosting.title,
        company: job.jobPosting.companyDetails.company.name,
        location: job.jobPosting.formattedLocation,
        description: job.jobPosting.description.text,
        applyUrl: job.jobPosting.applyMethod.companyApplyUrl
      }));
    } catch (error) {
      console.error('Error fetching job listings:', error.response?.data || error.message);
      throw error;
    }
  }

  // Helper method to refresh token if needed
  async refreshToken() {
    // Implement token refresh logic if using refresh tokens
    // This depends on your OAuth grant type and requirements
  }
}