export const config = [
  {
    name: 'course',
    label: 'Course',
    type: 'TextFilter',
    is_table_filter: false,
    typeahead: '/api/stats/_typeahead/course/'
  },
  {
    name: 'xsp',
    label: 'Exchange SP',
    type: 'NumberRangeFilter',
    is_table_filter: false,
    min: 1,
    max: 1001,
    is_percentage: false
  },
  {
    name: 'xsp-rank',
    label: 'XSP Rank',
    type: 'NumberRangeFilter',
    is_table_filter: false,
    min: 1,
    max: 40,
    is_percentage: false
  },
  {
    name: 'value-percentage',
    label: 'Value %',
    type: 'NumberRangeFilter',
    is_table_filter: false,
    min: 3,
    max: 17938,
    is_percentage: false
  },
  {
    name: 'distance-furlongs',
    label: 'Distance (fur)',
    type: 'NumberRangeFilter',
    is_table_filter: false,
    min: 5,
    max: 36,
    is_percentage: false
  },
  {
    name: 'race-type',
    label: 'Race Type',
    type: 'MultiOptionFilter',
    is_table_filter: false,
    options: [
      { value: 'FLAT', label: 'Flat' },
      { value: 'HDL', label: 'Hurdles' },
      {
        value: 'CHS',
        label: 'Chase'
      },
      { value: 'AWF', label: 'All-Weather Flat' },
      { value: 'NHF', label: 'National Hunt Flat' }
    ]
  },
  {
    name: 'going',
    label: 'Going',
    type: 'MultiOptionFilter',
    is_table_filter: false,
    options: [
      { value: 'H', label: 'Hard' },
      { value: 'F', label: 'Firm' },
      {
        value: 'GF',
        label: 'Good to Firm'
      },
      { value: 'G', label: 'Good' },
      { value: 'GY', label: 'Good to Yielding' },
      {
        value: 'GS',
        label: 'Good to Soft'
      },
      { value: 'Y', label: 'Yielding' },
      { value: 'YS', label: 'Yielding to Soft' },
      {
        value: 'S',
        label: 'Soft'
      },
      { value: 'SH', label: 'Soft to Heavy' },
      { value: 'HY', label: 'Heavy' },
      {
        value: 'FT',
        label: 'Fast'
      },
      { value: 'SF', label: 'Standard to Fast' },
      { value: 'SD', label: 'Standard' },
      {
        value: 'SS',
        label: 'Standard to Slow'
      },
      { value: 'SL', label: 'Slow' },
      { value: 'VS', label: 'Very Slow' }
    ]
  },
  {
    name: 'age-range',
    label: 'Age Range',
    type: 'MultiOptionFilter',
    is_table_filter: false,
    options: [
      { value: '-2', label: '-2' },
      { value: '2yo', label: '2yo' },
      {
        value: '2-3yo',
        label: '2-3yo'
      },
      { value: '2yo+', label: '2yo+' },
      { value: '-3', label: '-3' },
      {
        value: '3yo',
        label: '3yo'
      },
      { value: '3-4yo', label: '3-4yo' },
      { value: '3-5yo', label: '3-5yo' },
      {
        value: '3-6yo',
        label: '3-6yo'
      },
      { value: '3yo+', label: '3yo+' },
      { value: '-4', label: '-4' },
      {
        value: '4yo',
        label: '4yo'
      },
      { value: '4-5yo', label: '4-5yo' },
      { value: '4-6yo', label: '4-6yo' },
      {
        value: '4-7yo',
        label: '4-7yo'
      },
      { value: '4-8yo', label: '4-8yo' },
      { value: '4yo+', label: '4yo+' },
      {
        value: '-5',
        label: '-5'
      },
      { value: '5yo', label: '5yo' },
      { value: '5-6yo', label: '5-6yo' },
      {
        value: '5-7yo',
        label: '5-7yo'
      },
      { value: '5-8yo', label: '5-8yo' },
      { value: '5yo+', label: '5yo+' },
      {
        value: '6yo+',
        label: '6yo+'
      },
      { value: '7yo+', label: '7yo+' },
      { value: '8yo+', label: '8yo+' },
      {
        value: '9yo+',
        label: '9yo+'
      },
      { value: '10yo+', label: '10yo+' }
    ]
  },
  {
    name: 'surface',
    label: 'Surface',
    type: 'MultiOptionFilter',
    is_table_filter: false,
    options: [
      { value: 'fs', label: 'Fibresand (FS)' },
      {
        value: 'pt',
        label: 'Polytrack (PT)'
      },
      { value: 'sa', label: 'Sand (Sand)' },
      { value: 'ta', label: 'Tapeta (Tap)' },
      {
        value: 'tu',
        label: 'Turf'
      }
    ]
  },
  {
    name: 'handicap',
    label: 'Handicap',
    type: 'BooleanFilter',
    is_table_filter: false
  },
  {
    name: 'runner',
    label: 'Runner',
    type: 'TextFilter',
    is_table_filter: false,
    typeahead: '/api/stats/_typeahead/runner/'
  },
  {
    name: 'trainer',
    label: 'Trainer',
    type: 'TextFilter',
    is_table_filter: false,
    typeahead: '/api/stats/_typeahead/trainer/'
  },
  {
    name: 'jockey',
    label: 'Jockey',
    type: 'TextFilter',
    is_table_filter: false,
    typeahead: '/api/stats/_typeahead/jockey/'
  },
  {
    name: 'sire',
    label: 'Sire',
    type: 'TextFilter',
    is_table_filter: false,
    typeahead: '/api/stats/_typeahead/sire/'
  },
  {
    name: 'field-size',
    label: 'Field Size',
    type: 'NumberRangeFilter',
    is_table_filter: false,
    min: 0,
    max: 40,
    is_percentage: false
  },
  {
    name: 'sex',
    label: 'Sex',
    type: 'MultiOptionFilter',
    is_table_filter: false,
    options: [
      { value: 'C', label: 'Colt' },
      { value: 'F', label: 'Filly' },
      {
        value: 'M',
        label: 'Mare'
      },
      { value: 'G', label: 'Gelding' },
      { value: 'H', label: 'Horse (Stallion)' },
      {
        value: 'R',
        label: 'Rig'
      }
    ]
  },
  {
    name: 'age',
    label: 'Age',
    type: 'NumberRangeFilter',
    is_table_filter: false,
    min: 2,
    max: 17,
    is_percentage: false
  },
  {
    name: 'days-off',
    label: 'Days Off',
    type: 'NumberRangeFilter',
    is_table_filter: false,
    min: 1,
    max: 2216,
    is_percentage: false
  },
  {
    name: 'class-change',
    label: 'Class +/-',
    type: 'NumberRangeFilter',
    is_table_filter: false,
    min: -9,
    max: 10,
    is_percentage: false
  },
  {
    name: 'class',
    label: 'Class',
    type: 'MultiOptionFilter',
    is_table_filter: false,
    options: [
      { value: 1, label: 1 },
      { value: 2, label: 2 },
      { value: 3, label: 3 },
      {
        value: 4,
        label: 4
      },
      { value: 5, label: 5 },
      { value: 6, label: 6 },
      { value: 7, label: 7 },
      {
        value: 0,
        label: 'No Class'
      }
    ]
  },
  {
    name: 'rtr-rank',
    label: 'RTR Rank',
    type: 'NumberRangeFilter',
    is_table_filter: false,
    min: 1,
    max: 40,
    is_percentage: false
  },
  {
    name: 'av3-rank',
    label: 'AV3 Rank',
    type: 'NumberRangeFilter',
    is_table_filter: false,
    min: 1,
    max: 40,
    is_percentage: false
  },
  {
    name: 'av10-rank',
    label: 'AV10 Rank',
    type: 'NumberRangeFilter',
    is_table_filter: false,
    min: 1,
    max: 40,
    is_percentage: false
  },
  {
    name: 'date',
    label: 'Date',
    type: 'DateRangeFilter',
    is_table_filter: false
  },
  {
    name: 'month',
    label: 'Month',
    type: 'MultiOptionFilter',
    is_table_filter: false,
    options: [
      { value: 1, label: 'January' },
      { value: 2, label: 'February' },
      {
        value: 3,
        label: 'March'
      },
      { value: 4, label: 'April' },
      { value: 5, label: 'May' },
      { value: 6, label: 'June' },
      {
        value: 7,
        label: 'July'
      },
      { value: 8, label: 'August' },
      { value: 9, label: 'September' },
      {
        value: 10,
        label: 'October'
      },
      { value: 11, label: 'November' },
      { value: 12, label: 'December' }
    ]
  },
  {
    name: 'year',
    label: 'Year',
    type: 'MultiOptionFilter',
    is_table_filter: false,
    options: [
      { value: 2014, label: 2014 },
      { value: 2015, label: 2015 },
      {
        value: 2016,
        label: 2016
      },
      { value: 2017, label: 2017 },
      { value: 2018, label: 2018 },
      {
        value: 2019,
        label: 2019
      },
      { value: 2020, label: 2020 }
    ]
  },
  {
    name: 'runners',
    label: 'Runs',
    type: 'NumberRangeFilter',
    is_table_filter: true,
    min: 1,
    max: '',
    is_percentage: false
  },
  {
    name: 'sr',
    label: 'SR (%)',
    type: 'NumberRangeFilter',
    is_table_filter: true,
    min: 0,
    max: 100,
    is_percentage: true
  },
  {
    name: 'p_and_l_bfsp',
    label: 'XSP P & L',
    type: 'NumberRangeFilter',
    is_table_filter: true,
    min: '',
    max: '',
    is_percentage: false
  },
  {
    name: 'roi_bfsp',
    label: 'XSP ROI (%)',
    type: 'NumberRangeFilter',
    is_table_filter: true,
    min: '',
    max: '',
    is_percentage: true
  },
  {
    name: 'p_and_l_isp',
    label: 'ISP P & L',
    type: 'NumberRangeFilter',
    is_table_filter: true,
    min: '',
    max: '',
    is_percentage: false
  },
  {
    name: 'roi_isp',
    label: 'ISP ROI (%)',
    type: 'NumberRangeFilter',
    is_table_filter: true,
    min: '',
    max: '',
    is_percentage: true
  }
]
