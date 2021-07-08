import { HUB_STEPS, ROUTES } from 'constants/constants'
import { HubCardProps } from 'components/dashboard/Hub/Card'
export const hubSteps: HubCardProps[] = [
  {
    id: HUB_STEPS.ELEGIBILITY,
    title: 'Eligibility',
    subtitle: 'Are you eligible for the study?',
    time: 'Approx. 2 minutes',
    status: 'active',
    route: ROUTES.ELIGIBILITY,
  },
  {
    id: HUB_STEPS.REGISTRATION,
    title: 'Registration',
    subtitle: 'Enter your phone number to create an account',
    time: 'Approx. 2 minutes',
    status: 'disabled',
    route: ROUTES.REGISTRATION,
  },
  {
    id: HUB_STEPS.ABOUT_THE_STUDY,
    title: 'About the study',
    subtitle: 'Learn about the study and the risks and benefits of joining',
    time: 'Approx. 7 minutes',
    status: 'active',
    route: ROUTES.ABOUT_THE_STUDY,
  },
  {
    id: HUB_STEPS.ABOUT_DATA_SHARING,
    title: 'About data sharing',
    subtitle: 'Learn how your data will be used.',
    time: 'Approx. 7 minutes',
    status: 'disabled',
    route: ROUTES.ABOUT_DATA_SHARING,
  },
  {
    id: HUB_STEPS.SUMMARY_AND_SIGNATURE,
    title: 'Summary and signature',
    subtitle: 'Review and confirm',
    time: 'Approx. 3 minutes',
    status: 'disabled',
    route: ROUTES.SUMMARY_AND_SIGNATURE,
  },
]
