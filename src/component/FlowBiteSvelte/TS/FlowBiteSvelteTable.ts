export type TCell = {
    isChecked: boolean,
    value: string | number
};

export const TCellTHeadDummyData: TCell[] = [
    {
      isChecked: true,
      value: ''
    },
    {
      isChecked: false,
      value: 'Name',
    },
    {
      isChecked: false,
      value: 'Value',
    },
    {
      isChecked: false,
      value: 'AVG',
    },
    {
      isChecked: false,
      value: 'W-Avg',
    },
    {
      isChecked: false,
      value: 'Max',
    },
    {
      isChecked: false,
      value: 'Max Time',
    }
];

export const TCellTBodyDummyData: TCell[][] = [
  [
    {
      isChecked: true,
      value: ''
    },
    {
      isChecked: false,
      value: 'pc1',
    },
    {
      isChecked: false,
      value: '50',
    },
    {
      isChecked: false,
      value: '50',
    },
    {
      isChecked: false,
      value: '70',
    },
    {
      isChecked: false,
      value: '70',
    },
    {
      isChecked: false,
      value: '2023-02-07 12:17:24',
    } 
  ],
  [
    {
      isChecked: true,
      value: ''
    },
    {
      isChecked: false,
      value: 'pc2',
    },
    {
      isChecked: false,
      value: '50',
    },
    {
      isChecked: false,
      value: '50',
    },
    {
      isChecked: false,
      value: '70',
    },
    {
      isChecked: false,
      value: '70',
    },
    {
      isChecked: false,
      value: '2023-02-07 12:17:24',
    } 
  ]
]