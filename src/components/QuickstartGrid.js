import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { css } from '@emotion/react';
import Button from '@newrelic/gatsby-theme-newrelic/src/components/Button';
import Surface from '@newrelic/gatsby-theme-newrelic/src/components/Surface';
import QuickstartTile from '@components/QuickstartTile';
import { quickstart } from '../types';

const QuickstartGrid = ({ quickstarts, stepSize }) => {
  const [displayed, showMore] = usePagination(quickstarts, stepSize);

  return (
    <>
      {displayed.map((q) => (
        <QuickstartTile key={q.id} {...q} />
      ))}
      {quickstarts.length > displayed.length && (
        <Surface
          base={Surface.BASE.SECONDARY}
          interactive
          css={css`
            box-shadow: none;
            display: flex;
            &:hover {
              box-shadow: none;
            }
          `}
        >
          <Button
            variant={Button.VARIANT.SECONDARY}
            css={css`
              border: 1px solid var(--primary-text-color);
              background: none;
              border-radius: 8px;
              font-size: 1rem;
              width: 100%;
            `}
            onClick={showMore}
          >
            Show more
          </Button>
        </Surface>
      )}
    </>
  );
};

const usePagination = (quickstarts, size) => {
  const [numDisplayed, setNumDisplayed] = useState(size);
  const [qs, setQs] = useState(quickstarts.slice(0, size));

  useEffect(() => {
    setQs(quickstarts.slice(0, numDisplayed));
  }, [numDisplayed, quickstarts]);

  useEffect(() => {
    setNumDisplayed(size);
  }, [size]);

  const showMore = () => {
    setNumDisplayed(numDisplayed + size + 1);
  };

  return [qs, showMore];
};

QuickstartGrid.propTypes = {
  quickstarts: PropTypes.arrayOf(quickstart),
  stepSize: PropTypes.number,
};

export default QuickstartGrid;
