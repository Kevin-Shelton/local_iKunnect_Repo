export const LicensePlanPricing = {
  licenses: [
    {
      name: 'Agent Seats Licenses',
      trial: '1',
      startUp: '5',
      growth: '15',
      scale: '50',
    },
    {
      name: 'Admin Licenses',
      trial: 'cross',
      startUp: '1',
      growth: '2',
      scale: '3',
    },
    {
      name: 'Supervisor Licenses',
      trial: 'cross',
      startUp: 'cross',
      growth: '2',
      scale: '5',
    },
    {
      name: 'Endpoint Licenses',
      trial: '1',
      startUp: '+20/per',
      growth: '+18/per',
      scale: '50 EP Included',
    },
  ],
  features: [
    {
      name: 'Basic Call Handling',
      trial: 'Basic',
      startUp: 'tick',
      growth: 'tick',
      scale: 'tick',
    },
    {
      name: 'Advanced Call Routing',
      trial: 'cross',
      startUp: 'tick',
      growth: 'tick',
      scale: 'tick',
    },
    {
      name: 'IVR',
      trial: 'cross',
      startUp: 'tick',
      growth: 'tick',
      scale: 'tick',
    },
    {
      name: 'Local Presence Dialing',
      trial: 'cross',
      startUp: 'tick',
      growth: 'tick',
      scale: 'tick',
    },
    {
      name: 'Predictive Dialer',
      trial: 'cross',
      startUp: '$150/m',
      growth: '$120/m',
      scale: 'tick',
    },
    {
      name: 'Advanced Omnichannel',
      trial: 'cross',
      startUp: '$100/channel/m',
      growth: 'Email/SMS/Chat',
      scale: 'All Channels',
    },
    {
      name: 'Ticketing Integration',
      trial: 'cross',
      startUp: 'add-on',
      growth: 'Basic Integration',
      scale: 'Advanced Integration',
    },
    {
      name: 'Voice-to-Case',
      trial: 'cross',
      startUp: 'cross',
      growth: 'cross',
      scale: 'tick',
    },
    {
      name: 'Case Mangement',
      trial: 'Basic',
      startUp: 'Basic',
      growth: 'tick',
      scale: 'tick',
    },
    {
      name: 'Call Disposition Notes',
      trial: 'cross',
      startUp: 'tick',
      growth: 'tick',
      scale: 'tick',
    },
    {
      name: 'Business Hours Config',
      trial: 'cross',
      startUp: 'tick',
      growth: 'tick',
      scale: 'tick',
    },
    {
      name: 'Voicemail Management',
      trial: 'cross',
      startUp: 'tick',
      growth: 'tick',
      scale: 'tick',
    },
    {
      name: 'iKunnect Intelligence',
      trial: 'cross',
      startUp: '$50/m',
      growth: '$100/m',
      scale: 'tick',
    },
    {
      name: 'Number Management',
      trial: 'cross',
      startUp: 'tick',
      growth: 'tick',
      scale: 'tick',
    },
    {
      name: 'Advanced AI Automation',
      trial: 'cross',
      startUp: 'cross',
      growth: 'cross',
      scale: '$200/m',
    },
    {
      name: 'Client Branding',
      trial: 'cross',
      startUp: 'tick',
      growth: 'tick',
      scale: 'tick',
    },
  ],
};

export const PricesByDuration: {
  month: { [key: string]: { value: number; disValue: string } };
  year: { [key: string]: { value: number; disValue: string } };
} = {
  month: {
    Trial: { value: 0, disValue: '$-' },
    StartUp: { value: 500, disValue: '$500' },
    Growth: { value: 1500, disValue: '$1,500' },
    Scale: { value: 5000, disValue: '$5,000' },
  },
  year: {
    Trial: { value: 0, disValue: '$-' },
    StartUp: { value: 4500, disValue: '$4,500' },
    Growth: { value: 13500, disValue: '$13,500' },
    Scale: { value: 45000, disValue: '$45,000' },
  },
};
