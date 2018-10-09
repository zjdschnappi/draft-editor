import React from 'react';

function handleStrategy(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'EMOJI';
  }, callback);
}

const Emoji = (props) => {
  const { children, entityKey, contentState } = props;
  const { url } = contentState.getEntity(entityKey).getData();
  let backgroundUrl = CONFIG.resourcePath + '/images/emojis/' + url;
  return (
    <i
      // contentEditable={false}
      data-offset-key={props.offsetKey}
      className="span-emoji"
      style={{
        display: 'inline-block',
        overflow: 'hidden',
        color: 'transparent',
        width: '22px',
        height: '22px',
        background: `url(${backgroundUrl}) no-repeat`,
        verticalAlign: 'middle'
      }}
    >
      {children}
    </i>
  );
};

export default {
  strategy: handleStrategy,
  component: Emoji
};
