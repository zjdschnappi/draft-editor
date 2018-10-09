import React from 'react';

function handleStrategy(contentBlock, callback, contentState) {
  contentBlock.findEntityRanges((character) => {
    const entityKey = character.getEntity();
    return entityKey !== null && contentState.getEntity(entityKey).getType() === 'PROJECT';
  }, callback);
}

const Project = (props) => {
  const { children, entityKey, contentState } = props;
  const { purchaseNo } = contentState.getEntity(entityKey).getData();
  return (
    <span data-offet-key={props.offsetKey} style={{ userSelect: 'none' }}>
      <input
        className="tag-project"
        data-purchaseNo={purchaseNo}
        type="button"
        role="project"
        value={`[方案号:${purchaseNo}]`}
      />
      {children}
    </span>
  );
};

export default {
  strategy: handleStrategy,
  component: Project
};
