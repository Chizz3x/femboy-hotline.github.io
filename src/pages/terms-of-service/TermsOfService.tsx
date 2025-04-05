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
				Terms of Service for femboy-hotline.com
			</h2>

			<p>
				<b>Effective Date:</b>{' '}
				{effectiveDate.format('MMMM D, YYYY')}
			</p>

			<p>
				Welcome to femboy-hotline.com. By using
				this website, you agree to comply with and
				be bound by the following terms and
				conditions. If you disagree with any part
				of these terms, please do not use our
				website.
			</p>

			<h2>Age Restriction</h2>
			<p>
				This website is not intended for
				individuals under the age of 18. By
				accessing or using femboy-hotline.com, you
				confirm that you are at least 18 years
				old. If you are under 18, you are not
				permitted to view or use this website.
			</p>

			<h2>User Responsibilities</h2>
			<p>
				Users are solely responsible for any
				content they post, upload, or share on
				femboy-hotline.com, including text,
				images, links, and other materials. By
				posting on this site, you agree that you
				have the necessary rights to share the
				content and that it does not violate any
				laws or third-party rights.
			</p>

			<h2>Content Liability</h2>
			<p>
				The owner of femboy-hotline.com does not
				assume responsibility for user-generated
				content. We do not actively monitor,
				endorse, or verify user posts and are not
				liable for any content that may be
				offensive, inaccurate, misleading, or
				otherwise objectionable. If you find any
				content that violates legal standards or
				our policies, please contact us directly
				so that appropriate action may be taken.
			</p>

			<h2>Content Moderation</h2>
			<p>
				We reserve the right to review, moderate,
				or remove any content that, in our sole
				discretion, violates our policies, is
				unlawful, or is otherwise inappropriate.
				However, we are not obligated to actively
				monitor all user submissions and assume no
				liability for content that is posted by
				users.
			</p>

			<h2>
				Third-Party Links and Advertisements
			</h2>
			<p>
				This website may display ads or contain
				links to external sites for reference or
				additional resources. We do not have
				control over third-party sites and are not
				responsible for their content, practices,
				or policies. Users should review the terms
				and privacy policies of any external sites
				they visit.
			</p>

			<h2>Disclaimer of Warranties</h2>
			<p>
				femboy-hotline.com is provided on an
				&quot;as is&quot; basis without warranties
				of any kind, express or implied. We make
				no guarantees regarding the accuracy,
				reliability, or completeness of the
				information or services on this site and
				assume no responsibility for any errors or
				omissions.
			</p>

			<h2>Limitation of Liability</h2>
			<p>
				Under no circumstances shall the owner of
				femboy-hotline.com be liable for any
				direct, indirect, incidental,
				consequential, or special damages arising
				from your use of or inability to use this
				website, even if we have been advised of
				the possibility of such damages.
			</p>

			<h2>Changes to These Terms</h2>
			<p>
				We may update these Terms of Service at
				any time. Any changes will be posted on
				this page with an updated effective date.
				Continued use of the site after changes
				are posted constitutes your acceptance of
				the new terms.
			</p>

			<h2>Contact Us</h2>
			<p>
				If you have any questions about these
				Terms of Service or encounter any legal
				issues regarding content on this site,
				please contact us{' '}
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
