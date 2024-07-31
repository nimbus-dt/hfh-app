import { Button, Flex, Text, TextField } from '@aws-amplify/ui-react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MdInsertPhoto } from 'react-icons/md';
import PropTypes from 'prop-types';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import Modal from 'components/Modal';
import FileInput from 'components/FileInput';
import CustomButton from 'components/CustomButton/CustomButton';
import { INSERT_IMAGE_COMMAND } from '../../ImagePlugin';
import style from '../ToolbarPlugin.module.css';

const InsertImageButton = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editor] = useLexicalComposerContext();
  const [type, setType] = useState();
  const [url, setUrl] = useState('');
  const [files, setFiles] = useState([]);
  const [altText, setAltText] = useState('');
  const { t } = useTranslation();

  const handleOpenClose = () => {
    setType();
    setUrl('');
    setFiles([]);
    setAltText('');
    setModalIsOpen((prevModalIsOpen) => !prevModalIsOpen);
  };

  const handleAddUrlOnClick = () => {
    if (url.length > 0) {
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        src: url,
        altText,
      });
      handleOpenClose();
    }
  };

  const handleAddFileOnClick = () => {
    if (files.length > 0) {
      editor.dispatchCommand(INSERT_IMAGE_COMMAND, {
        src: URL.createObjectURL(files[0]),
        altText,
        name: files[0]?.name,
      });
      handleOpenClose();
    }
  };

  return (
    <>
      <Modal
        title={t(
          'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.insertImage'
        )}
        open={modalIsOpen}
        onClickClose={handleOpenClose}
        width={type ? '35rem' : '20rem'}
      >
        {type === 'url' && (
          <Flex direction="column" alignItems="stretch">
            <TextField
              label={t(
                'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.imageUrl'
              )}
              alignSelf="stretch"
              id="image-url"
              type="url"
              value={url}
              onChange={(event) => setUrl(event.currentTarget.value)}
            />
            <TextField
              label={t(
                'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.altText'
              )}
              id="image-alt"
              value={altText}
              onChange={(event) => setAltText(event.currentTarget.value)}
            />
            <Flex justifyContent="end">
              <Button variation="primary" onClick={handleAddUrlOnClick}>
                {t(
                  'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.add'
                )}
              </Button>
              <Button onClick={handleOpenClose}>
                {t(
                  'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.cancel'
                )}
              </Button>
            </Flex>
          </Flex>
        )}
        {type === 'file' && (
          <Flex direction="column" alignItems="stretch">
            <FileInput
              label={t(
                'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.uploadImageFile'
              )}
              maxFileCount={1}
              multiple={false}
              files={files}
              onChange={(newFiles) => setFiles(newFiles)}
              accept="image/*"
            />
            <TextField
              label={t(
                'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.altText'
              )}
              id="image-alt"
            />
            <Flex justifyContent="end">
              <Button variation="primary" onClick={handleAddFileOnClick}>
                {t(
                  'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.add'
                )}
              </Button>
              <Button onClick={handleOpenClose}>
                {t(
                  'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.cancel'
                )}
              </Button>
            </Flex>
          </Flex>
        )}

        {type === undefined && (
          <Flex direction="column" alignItems="stretch">
            <Button variation="primary" onClick={() => setType('url')}>
              {t(
                'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.url'
              )}
            </Button>
            <Text alignSelf="center">
              {t(
                'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.or'
              )}
            </Text>
            <Button variation="primary" onClick={() => setType('file')}>
              {t(
                'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.uploadImage'
              )}
            </Button>
          </Flex>
        )}
      </Modal>
      <CustomButton
        variation="text-only"
        onClick={handleOpenClose}
        aria-label={t(
          'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.insertImage'
        )}
        title={t(
          'components.lexicalEditor.plugins.ToolbarPlugin.components.InsertImageButton.insertImage'
        )}
        className={style.toolbarButton}
      >
        <MdInsertPhoto />
      </CustomButton>
    </>
  );
};

export default InsertImageButton;
