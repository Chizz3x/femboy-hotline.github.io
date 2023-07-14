import { ContentCopy } from "@mui/icons-material";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Tooltip, { TooltipProps } from "@mui/material/Tooltip";
import styled from "styled-components";
import React from "react";
import copyToClipboard from "../../utils/copy-to-clipboard";

const CopyButton = (props: NCopyButton.IProps) => {
  const {
    tooltipProps,
    iconButtonProps,
    icon,
    data
  } = props;

  const [ titleText, setTitleText ] = React.useState(props?.tooltipProps?.title || "copy");

  const handleCopy = () => {
    copyToClipboard(data);
    setTitleText("copied");
    setTimeout(() => {
      setTitleText(props?.tooltipProps?.title || "copy");
    }, 2000);
  };

  return <CopyButtonStyle className='copy-button'>
    <Tooltip PopperProps={{ sx: { ".MuiTooltip-tooltip": { margin: "0 !important" } } }} title={titleText} {...tooltipProps}>
      <IconButton className='copy-icon-btn' sx={{ padding: 0 }} disableRipple onClick={handleCopy} {...iconButtonProps}>
        {icon || <ContentCopy />}
      </IconButton>
    </Tooltip>
  </CopyButtonStyle>;
};

export { CopyButton };

export namespace NCopyButton {
	export interface IProps {
		data: string;
		tooltipProps?: TooltipProps;
		iconButtonProps?: IconButtonProps;
		icon?: JSX.Element;
	}
}

const CopyButtonStyle = styled.span`
	.copy-icon-btn {
		color: var(--c-p8) !important;
		svg {
			width: 18px;
		}
	}
`;