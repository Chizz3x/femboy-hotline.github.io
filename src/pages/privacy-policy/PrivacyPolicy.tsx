import styled from 'styled-components';
import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';

const effectiveDate = dayjs('2025-02-11');

const Privacy = () => {
	return (
		<PrivacyStyle>
			<h2>
				Privacy Policy for femboy-hotline.com
			</h2>

			<p>
				<b>Effective Date:</b>{' '}
				{effectiveDate.format('MMMM D, YYYY')}
			</p>

			<p>
				Thank you for visiting femboy-hotline.com.
				This website is intended for informational
				and entertainment purposes only. We
				respect your privacy and are committed to
				protecting any information you choose to
				share with us.
			</p>

			<h2>Information We Collect</h2>
			<p>
				We only collect personal information that
				users voluntarily provide, such as when
				registering an account or submitting
				information through forms on our website.
			</p>

			<h2>Information We Do Not Collect</h2>
			<p>
				We do not automatically collect any
				personally identifiable information, such
				as names, email addresses, or phone
				numbers, unless explicitly provided by the
				user.
			</p>

			<h2>Cookies and Tracking</h2>
			<p>
				We may use cookies and tracking
				technologies to analyze website traffic
				and user behavior through Google
				Analytics. These cookies do not collect
				personally identifiable information. To
				learn more about Google Analytics’ data
				practices and opt-out options, visit the{' '}
				<a
					href="https://support.google.com/analytics/answer/6004245"
					target="_blank"
					rel="noreferrer"
				>
					Google Analytics Privacy Policy
				</a>
				.
			</p>

			<h2>Advertisements</h2>
			<p>
				This website may display advertisements to
				support operational costs. These ads may
				use cookies or other tracking technologies
				to provide relevant content and measure
				performance. These advertisements are
				delivered by third-party networks, over
				which we have no control. Please refer to
				the privacy policies of these third-party
				networks for further information.
			</p>

			<h2>External Links</h2>
			<p>
				Our website may include links to external
				websites for reference or additional
				information. We are not responsible for
				the privacy practices or content of these
				external sites.
			</p>

			<h2>Children&apos;s Privacy</h2>
			<p>
				This website is intended for individuals
				aged 18 and above. We do not knowingly
				collect, store, or process any personal
				information from individuals under the age
				of 18. If you believe that a minor has
				provided us with personal information,
				please contact us so we can take
				appropriate action.
			</p>

			<h2>Changes to This Privacy Policy</h2>
			<p>
				We may update this privacy policy from
				time to time to reflect changes in our
				practices or legal requirements. Any
				modifications will be posted on this page
				with an updated effective date.
			</p>

			<h2>Contact Us</h2>
			<p>
				If you have any questions or concerns
				regarding this privacy policy, you can
				contact us{' '}
				<Link to={ROUTES.contact}>here</Link>.
			</p>
		</PrivacyStyle>
	);
};

export default Privacy;

const PrivacyStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
	display: flex;
	flex-direction: column;
	text-align: center;
	align-items: center;
	> * {
		max-width: 500px;
	}
	> p {
		text-align: justify;
	}
`;
