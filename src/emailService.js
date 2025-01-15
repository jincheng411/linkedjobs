import nodemailer from 'nodemailer';

export class EmailService {
  constructor(config) {
    this.transporter = nodemailer.createTransport({
      host: config.host,
      port: config.port,
      secure: false,
      auth: {
        user: config.user,
        pass: config.pass,
      },
    });
    this.toEmail = config.to;
  }

  async sendJobListings(jobs) {
    const htmlContent = jobs.map(job => `
      <div style="margin-bottom: 20px; padding: 10px; border: 1px solid #ccc;">
        <h2>${job.title}</h2>
        <p><strong>Company:</strong> ${job.company}</p>
        <p><strong>Location:</strong> ${job.location}</p>
        <p>${job.description}</p>
      </div>
    `).join('');

    const mailOptions = {
      from: this.transporter.options.auth.user,
      to: this.toEmail,
      subject: 'New Job Listings',
      html: `
        <h1>Latest Job Listings</h1>
        ${htmlContent}
      `
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}