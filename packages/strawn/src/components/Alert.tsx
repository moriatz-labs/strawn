import type { AlertProps } from "../types/primitives";
import { AlertRoot } from "./AlertRoot";
import { Box } from "./Box";
import { FieldLabel } from "./FieldLabel";
import { Flex } from "./Flex";
import { Text } from "./Text";
import { alertToneStyles } from "../constants/alertToneStyles";

export function Alert({ title, children, tone = "info", icon, action, css }: AlertProps) {
    return (<AlertRoot role={tone === "error" ? "alert" : "status"} css={{ ...alertToneStyles[tone], ...css }}>
      <Flex gap="$3" alignItems="flex-start">
        {icon ? <Box as="span" css={{ color: "$mutedForeground", display: "inline-flex", flexShrink: 0 }}>{icon}</Box> : null}
        <Box css={{ flex: 1 }}>
          {title ? <FieldLabel as="strong">{title}</FieldLabel> : null}
          <Text color="$mutedForeground" size="sm" css={{ marginTop: title ? "$1" : 0 }}>{children}</Text>
        </Box>
        {action}
      </Flex>
    </AlertRoot>);
}
