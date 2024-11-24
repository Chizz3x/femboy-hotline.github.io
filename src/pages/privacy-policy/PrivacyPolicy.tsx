import styled from 'styled-components';
import React from 'react';
import dayjs from 'dayjs';
import { Link } from 'react-router-dom';
import { ROUTES } from '../../routes';

const effectiveDate = dayjs('2024-11-08');

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
				This website is solely for informational
				and entertainment purposes and does not
				collect personal information from its
				visitors, except for the use of Google
				Analytics.
			</p>

			<h2>Information We Do Not Collect:</h2>
			<p>
				We do not collect any personal
				information, such as names, email
				addresses, or phone numbers.
			</p>

			<h2>Cookies and Tracking:</h2>
			<p>
				We may use cookies and tracking
				technologies for the sole purpose of
				analyzing website traffic and user
				behavior through Google Analytics. These
				cookies do not collect personally
				identifiable information. You can learn
				more about Google Analytics&apos; data
				practices and opt-out options by visiting
				the{' '}
				<a
					href="https://support.google.com/analytics/answer/6004245"
					target="_blank"
					rel="noreferrer"
				>
					Google Analytics Privacy Policy
				</a>
				.
			</p>

			<h2>Advertisements:</h2>
			<p>
				This website may display ads to help cover
				its operational costs. Advertisements may
				use cookies or other tracking technologies
				to provide relevant content and measure ad
				performance. Please note that these ads
				are delivered by third-party ad networks,
				and we do not have control over their data
				collection practices. We recommend
				reviewing the privacy policies of these ad
				networks for more information.
			</p>

			<h2>External Links:</h2>
			<p>
				Our website may contain links to external
				websites for reference or additional
				information. We are not responsible for
				the privacy practices or content of these
				external sites.
			</p>

			<h2>Children&apos;s Privacy:</h2>
			<p>
				Our website is not intended for children
				under the age of 13. We do not knowingly
				collect or store any information from
				children.
			</p>

			<h2>Changes to This Privacy Policy:</h2>
			<p>
				This privacy policy may be updated from
				time to time. Any changes will be posted
				on this page with an updated effective
				date.
			</p>

			<h2>Contact Us:</h2>
			<p>
				If you have any questions or concerns
				about this privacy policy, you can contact
				us <Link to={ROUTES.contact}>here</Link>.
			</p>
		</PrivacyStyle>
	);
};

export default Privacy;

const PrivacyStyle = styled.div`
	flex-shrink: 0;
	flex-grow: 1;
	padding: 20px 50px;
`;
