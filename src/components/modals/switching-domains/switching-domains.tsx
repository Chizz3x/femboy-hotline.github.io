import React from "react";
import styled from "styled-components";
import { NModals } from "../modals";
import { ModalLayout } from "../layout";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

const name = "ModalSwitchingDomains";
const Modal = (props: NModalSwitchingDomains.IProps) => {
  const handleCheckbox = (_event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if(checked) {
      localStorage.setItem("switching-domains", "true");
    } else {
      localStorage.removeItem("switching-domains");
    }
  };

  return <ModalLayout {...props} name={name}>
    <ModalSwitchingDomainsStyle>
      <h2>ATTENTION!</h2>
      <p><b className='brand'>femboy-hotline.ml</b> will cease to exist on <b className='brand'>2023-10-24</b> because we are switching to <b className='brand'>femboy-hotline.com</b>.</p>
      <p className='gray'>This redirect will be operational until the provided date.</p>
      <FormControlLabel className="checkbox" label="Don't show again" control={<Checkbox classes={{ checked: "checked" }} onChange={handleCheckbox} />} />
      <br />
      <span className='smol'>Click on the overlay to close</span>
    </ModalSwitchingDomainsStyle>
  </ModalLayout>;
};

export { name, Modal };

export namespace NModalSwitchingDomains {
	// eslint-disable-next-line @typescript-eslint/no-empty-interface
	export interface IProps extends NModals.IDefaultProps {
		//
	}
}

const ModalSwitchingDomainsStyle = styled.div`
	max-width: 400px;
	h2 {
		color: var(--c-red1);
	}
	.gray {
		color: var(--c-p3);
	}
	.brand {
		color: var(--c-pink1);
	}
	.smol {
		font-size: 12px;
		color: var(--c-p3);
	}
	.checkbox {
		span {
			font-size: 14px;
			color: var(--c-p3);
		}
		.checked {
			path {
				color: var(--c-pink1);
			}
		}
		path {
			color: var(--c-p3);
		}
	}
`;