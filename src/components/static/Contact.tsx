import React from 'react'
import Typography from '@material-ui/core/Typography'

function Contact() {
  return (
    <div className="contact">
      <div className="contact__in-crisis">
        <div className="plus-signs" />
        <Typography variant="h2">If you are in a crisis</Typography>
        <Typography variant="body1">
          If you are in crisis, or feel that you are going to hurt yourself or
          others, please contact your healthcare provider. Additional resources
          provided below.
        </Typography>
      </div>
      <div className="contact__get-help">
        <Typography variant="h4">Get help in your region</Typography>
        <button>Find Help</button>
      </div>
      <div className="contact__local-resource">
        <Typography variant="h2">Local Resources in India</Typography>
        <Typography variant="body1">
          iCallHelpline provides free counseling.
        </Typography>
        <Typography variant="body1">
          The iCallHelpline is available Monday-Saturday, 10am-8pm. Call
          022-25521111
        </Typography>
        <Typography variant="body1">
          You can also email iCallHelpline at icall@tiss.edu for a response from
          a counselor within 24 hours.
        </Typography>
        <button className="small">Visit Website</button>
      </div>
      <div className="contact__local-resource">
        <Typography variant="h2">Local Resources in South Africa</Typography>
        <Typography variant="body1">
          SADAG is available for emotional support.
        </Typography>
        <Typography variant="body1">
          The SADAG hotline is available 24/7 to provide assistance.{' '}
        </Typography>
        <Typography variant="body1">Call 0800456789 </Typography>
        <Typography variant="body1">
          You can also email SADAG at Zane@sadag.org for information about
          counseling.
        </Typography>
        <button className="small">Visit Website</button>
      </div>
      <div className="contact__local-resource">
        <Typography variant="h2">Local Resources in the UK</Typography>
        <Typography variant="body1">
          Samaritans UK is available for emotional support.
        </Typography>
        <Typography variant="body1">
          The Samaritans UK hotline is available 24/7.{' '}
        </Typography>
        <Typography variant="body1">
          For English, call 116 123 For Welsh, call l 0808 164 0123
        </Typography>
        <Typography variant="body1">
          You can also email Samaritans UK at jo@samaritans.org for a response
          from a counselor within 24 hours.
        </Typography>
        <button className="small">Visit Website</button>
      </div>
    </div>
  )
}

export default Contact
