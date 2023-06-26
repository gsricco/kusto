import { ReactNode } from "react";
import styled from "styled-components";

const BUTTON_COLORS = {
  primary: "#397DF6",
  secondary: "#171717",
};

const BUTTON_TEXT_COLORS = {
  primary: "#fff",
  secondary: "#397DF6",
};

export const Button = ({
  children,
  variant = "primary",
  className,
  onClick,
  type
}: {
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
  onClick: () => void;
  type?: string
}) => {
  return (
    <StyledButton onClick={onClick} className={className} variant={variant}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button.attrs(props => ({
  // we can define static props
  type: "submit",

  // or we can define dynamic ones
  // $type: props.$type || "",
}))<{ variant: "primary" | "secondary" }>`
  display: flex;
  width: 330px;
  padding: 6px 24px;
  justify-content: center;
  align-items: center;
  border-radius: 2px;
  border: 0;
  color: ${(props) => BUTTON_TEXT_COLORS[props.variant]};
  background-color: ${(props) => BUTTON_COLORS[props.variant]};
  font-size: 16px;
  font-family: Inter;
  font-weight: 600;
  line-height: 24px;
`;
