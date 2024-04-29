const button = {
  borderRadius: { value: '8px' },
  fontSize: { value: '{fontSizes.medium}' },
  fontWeight: { value: '{fontWeights.medium}' },
  lineHeight: { value: '{lineHeights.small}' },
  paddingBlockEnd: { value: '12px' },
  paddingBlockStart: { value: '12px' },
  paddingInlineEnd: { value: '16px' },
  paddingInlineStart: { value: '16px' },
  backgroundColor: { value: '{colors.neutral.10}' },
  color: { value: '{colors.neutral.100}' },
  borderColor: { value: '{colors.neutral.100}' },
  _hover: {
    backgroundColor: { value: '{colors.neutral.20}' },
    borderColor: { value: '{colors.neutral.100}' },
  },
  _focus: {
    backgroundColor: { value: '{colors.neutral.40}' },
    borderColor: { value: '{colors.neutral.100}' },
    boxShadow: { value: '0' },
  },
  _active: {
    backgroundColor: { value: '{colors.neutral.20}' },
    borderColor: { value: '{colors.neutral.100}' },
  },
  _disabled: {
    backgroundColor: { value: '{colors.neutral.60}' },
    borderColor: { value: '{colors.neutral.100}' },
  },
  primary: {
    backgroundColor: { value: '{colors.neutral.100}' },
    color: { value: '{colors.neutral.10}' },
    _hover: {
      backgroundColor: { value: '#3E3D3D' },
    },
    _focus: {
      backgroundColor: { value: '{colors.neutral.100}' },
      boxShadow: { value: '0' },
    },
    _active: {
      backgroundColor: { value: '#3E3D3D' },
    },
    _disabled: {
      backgroundColor: { value: '{colors.neutral.80}' },
      color: { value: '{colors.white}' },
    },
  },
  link: {
    backgroundColor: { value: '{colors.neutral.10}' },
    color: { value: '{colors.neutral.100}' },
    _hover: {
      backgroundColor: { value: '{colors.neutral.20}' },
      color: { value: '{colors.neutral.100}' },
    },
    _focus: {
      backgroundColor: { value: '{colors.neutral.40}' },
      color: { value: '{colors.neutral.100}' },
      boxShadow: { value: '0' },
    },
    _active: {
      color: { value: '{colors.neutral.100}' },
      backgroundColor: { value: '{colors.neutral.20}' },
    },
    _disabled: {
      color: { value: '{colors.neutral.100}' },
      backgroundColor: { value: '{colors.neutral.60}' },
    },
  },
};

export default button;
