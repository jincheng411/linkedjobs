import cron from 'node-cron';
import { config } from './config.js';
import { LinkedInAPI } from './linkedinApi.js';
import { EmailService } from './emailService.js';

const linkedInAPI = new LinkedInAPI(
  config.linkedin.clientId,
  config.linkedin.clientSecret
);

const emailService = new EmailService(config.email);

async function fetchAndSendJobs() {
  try {
    await linkedInAPI.authenticate();
    const jobs = await linkedInAPI.getJobListings();
    await emailService.sendJobListings(jobs);
    console.log('Job listings fetched and sent successfully');
  } catch (error) {
    console.error('Error in job fetching process:', error);
  }
}

// Schedule the task to run every hour
cron.schedule('0 * * * *', fetchAndSendJobs);

// Initial run
fetchAndSendJobs();

console.log('Job fetcher service started');