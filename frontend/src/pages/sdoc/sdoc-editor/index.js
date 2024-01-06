import React, { Fragment } from 'react';
import { SimpleEditor } from '@seafile/sdoc-editor';
import ExternalOperations from './external-operations';
import { Utils } from '../../../utils/utils';

export default class SdocEditor extends React.Component {

  constructor(props) {
    super(props);
    const { isStarred, isSdocDraft } = window.app.pageOptions;
    this.state = {
      isStarred: isStarred,
      isDraft: isSdocDraft
    };
  }

  componentDidMount() {
    this.onSetFavicon();
  }

  toggleStar = (isStarred) => {
    this.setState({isStarred: isStarred});
  };

  unmarkDraft = () => {
    this.setState({isDraft: false});
  };

  onSetFavicon = (suffix) => {
    let { docName } = window.seafile;
    if (suffix) {
      docName = docName + suffix;
    }
    const fileIcon = Utils.getFileIconUrl(docName, 192);
    document.getElementById('favicon').href = fileIcon;
  };

  onNewNotification = () => {
    this.onSetFavicon('_notification');
  };

  render() {
    const { repoID, docPath, docName, docPerm } = window.seafile;
    const { isStarred, isDraft } = this.state;
    return (
      <Fragment>
        <SimpleEditor isStarred={isStarred} isDraft={isDraft} />
        <ExternalOperations
          repoID={repoID}
          docPath={docPath}
          docName={docName}
          docPerm={docPerm}
          isStarred={isStarred}
          toggleStar={this.toggleStar}
          unmarkDraft={this.unmarkDraft}
          onNewNotification={this.onNewNotification}
        />
      </Fragment>
    );
  }
}
