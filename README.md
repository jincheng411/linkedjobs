# LinkedJobs

LinkedJobs is a Node.js application that fetches job listings from LinkedIn posted within the last hour and sends them via email every hour. This tool is ideal for job seekers who want to stay updated with the latest opportunities in real-time.

## Features

- LinkedIn API integration for job searching
- Automated email notifications
- Hourly job listing updates
- Configurable search parameters
- Secure credential management

## Prerequisites

- Node.js (v14 or higher)
- LinkedIn Developer Account
- Email account for sending notifications (e.g., Gmail)

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```
3. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
4. Configure environment variables in `.env`:
```env
# LinkedIn API Credentials
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret

# Email Configuration
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
EMAIL_TO=recipient@example.com
```

## Configuration

### LinkedIn API Setup

1. Create a LinkedIn Developer account
2. Register a new application
3. Get your Client ID and Client Secret
4. Configure OAuth 2.0 settings
5. Request necessary permissions:
   - r_emailaddress
   - r_liteprofile
   - r_jobs_posting

### Email Setup

For Gmail:
1. Enable 2-Factor Authentication
2. Generate an App-Specific Password
3. Use the generated password in `.env`

## Usage

Start the application:

```bash
npm start
```

The application will:
- Run immediately upon startup
- Schedule hourly job fetches
- Send email notifications with new listings

## Project Structure

```
├── src/
│   ├── config.js         # Configuration management
│   ├── emailService.js   # Email notification service
│   ├── index.js         # Application entry point
│   └── linkedinApi.js   # LinkedIn API integration
├── .env.example         # Environment variables template
├── package.json        # Project dependencies
└── README.md          # Project documentation
```

## Customization

Job search parameters can be modified in `src/linkedinApi.js`:
- Keywords
- Location
- Time period
- Number of results

## License

MIT

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to the branch
5. Open a Pull Request