import PropTypes from 'prop-types';
//
import Image from '../../image';

// ----------------------------------------------------------------------

SingleFilePreview.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
};

const CUSTOM_THUMBNAIL = ['audio/mp3', 'audio/wav', 'audio/ogg', 'audio/mpeg'];

export default function SingleFilePreview({ file }) {
  if (!file) {
    return null;
  }

  const imgUrl = typeof file === 'string' ? file : file.preview;

  if (CUSTOM_THUMBNAIL.includes(file.type)) {
    return (
      <>
        <Image
          alt="file preview"
          src={'/assets/illustrations/media_player.png'}
          sx={{
            top: 8,
            left: 8,
            zIndex: 8,
            borderRadius: 1,
            position: 'absolute',
            width: 'calc(100% - 16px)',
            height: 'calc(100% - 16px)',
          }}
        />
      </>
    );
  }

  return (
    <Image
      alt="file preview"
      src={imgUrl}
      sx={{
        top: 8,
        left: 8,
        zIndex: 8,
        borderRadius: 1,
        position: 'absolute',
        width: 'calc(100% - 16px)',
        height: 'calc(100% - 16px)',
      }}
    />
  );
}
