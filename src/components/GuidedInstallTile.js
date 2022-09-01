import React from 'react';
import { css } from '@emotion/react';
import Button from '@newrelic/gatsby-theme-newrelic/src/components/Button';
import Surface from '@newrelic/gatsby-theme-newrelic/src/components/Surface';
import useInstrumentedHandler from '@newrelic/gatsby-theme-newrelic/src/hooks/useInstrumentedHandler';
import {
  SIGNUP_LINK,
  NR1_GUIDED_INSTALL_NERDLET,
  QUICKSTARTS_COLLAPSE_BREAKPOINT,
} from '@data/constants';
import { navigate } from 'gatsby';
import Cookies from 'js-cookie';
import { getGuidedInstallStackedNr1Url } from '@utils/get-pack-nr1-url';

const GuidedInstallTile = () => {
  const isReturningUser = Boolean(Cookies.get('ajs_user_id'));

  const handleNavigation = async () => {
    const platformUrl = isReturningUser
      ? getGuidedInstallStackedNr1Url(NR1_GUIDED_INSTALL_NERDLET)
      : SIGNUP_LINK;
      console.log('before nav');
      await navigate(platformUrl);
      console.log('after nav');
  };

  const handleButtonClick = useInstrumentedHandler(
    handleNavigation,
    {
      eventName: 'clickSuperTile',
      category: 'QuickstartLanding',
      tile: 'guided',
    },
    'tessen'
  );

  return (
    <Surface
      onClick={handleButtonClick}
      base={Surface.BASE.PRIMARY}
      css={css`
        padding: 32px;
        overflow: hidden;
        height: 360px;
        min-width: 250px;
        margin: 0 auto;
        border: 1px solid #e4e5e6;
        border-radius: 8px;
        box-shadow: none;
        display: grid;
        align-items: flex-start;
        grid-gap: 0.2rem;
        grid-template-rows: 68px 200px auto;
        grid-template-columns: auto;
        grid-template-areas:
          'heading'
          'summary'
          'install';
        &:hover {
          cursor: pointer;
          border-color: var(--border-color);
          -webkit-transform: translateY(-2px);
          -moz-transform: translateY(-2px);
          -ms-transform: translateY(-2px);
          transform: translateY(-2px);
          box-shadow: var(--shadow-4);
        }

        @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
          padding: 32px 32px 24px 32px;
          width: 100%;
          min-width: 250px;
        }

        background: var(--brand-button-primary-accent);

        h2,
        p {
          @media screen and (max-width: ${QUICKSTARTS_COLLAPSE_BREAKPOINT}) {
            width: 100%;
            font-weight: 400;
          }
        }
      `}
    >
      <div
        css={css`
          grid-area: heading;
        `}
      >
        <h2
          css={css`
            font-weight: normal;
            font-size: 18px;
            line-height: 24px;
            margin: 0;
          `}
        >
          Guided install
        </h2>
        <span
          css={css`
            font-size: 18px;
            line-height: 24px;
            color: #00ac69;
          `}
        >
          First step
        </span>
      </div>

      <div
        css={css`
          grid-area: summary;
        `}
      >
        <p
          css={css`
            font-size: 18px;
            letter-spacing: -0.025em;
            line-height: 32px;
            font-weight: 300;

            /* Limit the number of lines */

            max-height: 8rem;

            /* Limits the number of lines */
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 3;
          `}
        >
          Many engineers start here. You'll install an agent with a single
          command and start monitoring your log and infrastructure data in real
          time.
        </p>
      </div>
      <div
        css={css`
          grid-area: install;
          display: flex;
        `}
      >
        <Button
          variant={Button.VARIANT.PRIMARY}
          size={Button.SIZE.SMALL}
          css={css`
            background: none;
            font-weight: 300;
            font-size: 18px;
            padding: 0 0 3px 0;
            border-bottom: 1px solid var(--primary-text-color);
            &:hover {
              background: none;
              color: var(--system-text-muted-light);
            }
          `}
        >
          Install New Relic
        </Button>
      </div>
    </Surface>
  );
};

GuidedInstallTile.propTypes = {};

export default GuidedInstallTile;
