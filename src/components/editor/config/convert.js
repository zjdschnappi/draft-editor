import { getHexColor } from '../helpers/colors.js';
const convertAtomicBlock = (block, contentState) => {
  if (!block || !block.key) {
    return <p />;
  }
  const contentBlock = contentState.getBlockForKey(block.key);

  if (!contentBlock) {
    return <p />;
  }

  const entityKey = contentBlock.getEntityAt(0);

  if (!entityKey) {
    return <p />;
  }

  const entity = contentState.getEntity(entityKey);
  const mediaType = entity.getType().toLowerCase();

  let { name } = entity.getData();

  if (mediaType === 'image') {
    return <upload_image file_name={name}>[图片]</upload_image>;
  } else {
    return <p />;
  }
};

const styleToHTML = () => (style) => {
  style = style.toLowerCase();

  if (style.indexOf('color-') === 0) {
    return <span style={{ color: '#' + style.split('-')[1] }} />;
  } else if (style.indexOf('bgcolor-') === 0) {
    return <span style={{ backgroundColor: '#' + style.split('-')[1] }} />;
  } else if (style.indexOf('fontsize-') === 0) {
    return <span style={{ fontSize: style.split('-')[1] + 'px' }} />;
  }
};

const blockToHTML = (contentState) => (block) => {
  const blockType = block.type.toLowerCase();

  if (blockType === 'atomic') {
    return convertAtomicBlock(block, contentState);
  }
};

const entityToHTML = (props) => (entity, originalText) => {
  const entityType = entity.type.toLowerCase();
  if (entityType === 'link') {
    return (
      <a href={entity.data.href} target={entity.data.target}>
        {originalText}
      </a>
    );
  } else if (entityType === 'color') {
    return <span style={{ color: entity.data.color }}>{originalText}</span>;
  } else if (entityType === 'bg-color') {
    return <span style={{ backgroundColor: entity.data.color }}>{originalText}</span>;
  } else if (entityType === 'emoji') {
    if (props.needFormatEmoji) {
      return (
        <emotion image_name={entity.data.url} image_alt={entity.data.name}>
          {entity.data.name}
        </emotion>
      );
    }
    return <img alt={entity.data.name} role="face" src={`${CONFIG.resourcePath}/images/emojis/${entity.data.url}`} />;
  } else if (entityType === 'project') {
    return (
      <p>
        <input
          className="tag-project"
          data-purchaseNo={entity.data.purchaseNo}
          type="button"
          role="project"
          value={`[???:${entity.data.purchaseNo}]`}
        />
      </p>
    );
  }
};

const htmlToStyle = (nodeName, node, currentStyle) => {
  if (!node || !node.style) {
    return currentStyle;
  }

  let newStyle = currentStyle;

  for (let i = 0; i < node.style.length; i++) {
    if (nodeName === 'span' && node.style[i] === 'color') {
      let color = getHexColor(node.style.color);
      newStyle = color ? newStyle.add('COLOR-' + color.replace('#', '').toUpperCase()) : newStyle;
    } else if (nodeName === 'span' && node.style[i] === 'background-color') {
      let color = getHexColor(node.style.backgroundColor);
      newStyle = color ? newStyle.add('BGCOLOR-' + color.replace('#', '').toUpperCase()) : newStyle;
    }
  }
  return newStyle;
};

const htmlToEntity = (nodeName, node, createEntity) => {
  const { src } = node;
  if (nodeName === 'emotion') {
    return createEntity('EMOJI', 'IMMUTABLE', {
      url: node.dataset.url,
      name: node.dataset.alt
    });
  }
  if (nodeName === 'img' && node.dataset.role === 'upload') {
    return createEntity('IMAGE', 'IMMUTABLE', {
      url: src,
      name: src.split('?fileName=')[1].split('&type=')[0]
    });
  }
  if (nodeName === 'a') {
    let { href, target } = node;
    return createEntity('LINK', 'MUTABLE', { href, target });
  }
};

const htmlToBlock = (nodeName) => {
  // let nodeStyle = node.style || {}
  if (nodeName === 'img') {
    return {
      type: 'atomic',
      data: {}
    };
  }
};

export const getToHTMLConfig = (props) => {
  return {
    styleToHTML: styleToHTML(props),
    entityToHTML: entityToHTML(props),
    blockToHTML: blockToHTML(props.contentState)
  };
};
export const getFromHTMLConfig = () => {
  return {
    htmlToStyle,
    htmlToEntity,
    htmlToBlock
  };
};
