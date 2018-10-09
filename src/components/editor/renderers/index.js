import _decorators from './decorators';
import Image from './atomic/Image';
import _getCustomStyleMap from './styles/inlineStyles';

const getAtomicBlockComponent = (block, superProps) => (props) => {
  const entityKey = props.block.getEntityAt(0);

  if (!entityKey) {
    return null;
  }

  const entity = props.contentState.getEntity(entityKey);
  const mediaData = entity.getData();
  const mediaType = entity.getType();
  const mediaProps = {
    ...superProps,
    block,
    mediaData,
    entityKey
  };
  if (mediaType === 'IMAGE') {
    return <Image {...mediaProps} />;
  }
  return null;
};

export const getBlockRendererFn = (props) => (block) => {
  return block.getType() === 'atomic'
    ? {
        component: getAtomicBlockComponent(block, props),
        editable: false
      }
    : null;
};
export const decorators = _decorators;
export const getCustomStyleMap = _getCustomStyleMap;
