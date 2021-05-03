export const schemaWhoControlsData = {
  type: 'object',
  properties: {
    who_controls_data: {
      type: 'string',
      title: ' ',
      enumNames: [
        '<strong>Democracy</strong> <p> All of the people who join the study will get to vote on how the data is used. The vote takes place after you join the study. We will ask for you to vote on questions like:  </p> <p> What topics should researchers using the study data be allowed to study? (Mental health only? Health generally? Any topic?)  </p> <p>Who reviews requests to use the data? (Participants like you? A special panel?)  </p> <p>Is it okay for researchers to make a profit from using the data?  </p> <p>No matter what the result of the vote is, researchers will have to sign an agreement saying they will not try to find out who you are and that they will keep the data secure.  </p> <p>We will tell you the results of the vote before we let any researchers use the data. If you disagree with the vote, you can quit (withdraw) from the study. We will delete any information that directly identifies you. We will not delete any coded study data.</p>',
        '<strong>Volunteer community review panel</strong> <p> Anyone who joins the study (including you!) can volunteer to be a data use request reviewer. These volunteers will take 1 week turns as reviewers. Researchers will have to submit a statement telling the reviewers why they want to use the data. The reviewers will have a set of criteria to apply to decide yes or no. These criteria will be decided on in advance by the whole group of volunteer reviewers. </p> <p> You can choose to volunteer as a review (if this option is chosen)</p>',
        '<strong>Professional review panel</strong> <p> The funder of the databank will pay a group to serve as a review panel. The panel will have at least one young person from each country contributing data. Researchers will have to submit a statement telling the reviewers why they want to use the data.  The reviewers would have a set of criteria to apply to decide yes or no. These criteria will be decided on in advance by the professional reviewers. </p>',
      ],
      enum: [
        'Democracy',
        'Volunteer community review panel',
        'Professional review panel',
      ],
    },
  },
}

export const uiSchemaWhoControlsData = {
  who_controls_data: {
    'ui:widget': 'radio',
  },
}
