interface ComponentProps {
  page: number;
}

interface NestedComponentProps {
  component: ComponentProps;
  disabled?: boolean;
}

interface ComponentsContainerProps {
  components?: NestedComponentProps[];
}

interface OptionsProps {
  root: {
    components?: ComponentsContainerProps[];
  };
}

type DataProps = unknown;

export { type ComponentProps, type OptionsProps, type DataProps };
