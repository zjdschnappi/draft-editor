import React from 'react';

export default class Image extends React.Component {
  render() {
    const { mediaData } = this.props;

    let { url, name } = mediaData;

    return (
      <img
        className="editor-image"
        ref={(instance) => (this.imageElement = instance)}
        src={url}
        alt={name}
        role="img"
      />
    );
  }
}
