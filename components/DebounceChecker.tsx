import { Alert, AlertIcon } from "@chakra-ui/react";

export default function DebounceChecker({
  name,
  isValid,
  loading,
}: {
  name: string | null;
  isValid: boolean;
  loading: boolean;
}) {
  if (loading) {
    return (
      <Alert status="info" rounded={5}>
        <AlertIcon />
        Checking...
      </Alert>
    );
  } else if (isValid) {
    return (
      <Alert status="success" rounded={5}>
        <AlertIcon />
        {name} is available 🎊
      </Alert>
    );
  } else if (name && !isValid) {
    return (
      <Alert status="error" rounded={5}>
        <AlertIcon />
        Oh no!, &quot;{name}&quot; is not valid ☹️
      </Alert>
    );
  } else {
    return null;
  }
}
