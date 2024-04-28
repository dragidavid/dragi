import Icon, { type Icons } from "components/icon";

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "components/primitives/alert";

export default function Callout({
  title,
  children,
  icon,
  ...props
}: {
  title?: string;
  children?: React.ReactNode;
  icon?: Icons;
}) {
  return (
    <Alert {...props}>
      {icon && <Icon name={icon} size="18" />}

      {title && <AlertTitle>{title}</AlertTitle>}

      <AlertDescription>{children}</AlertDescription>
    </Alert>
  );
}
