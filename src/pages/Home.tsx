import { EuiEmptyPrompt, EuiImage, EuiPage, EuiPageBody, EuiPageContent, EuiTitle } from '@elastic/eui';
import React from 'react';
import { Link } from 'react-router-dom';

import CallToAction from '../components/CallToAction';

const Home = () => {
  return (
    <EuiPage paddingSize="l">
      <EuiPageBody paddingSize="l">
        <EuiPageContent
          verticalPosition="center"
          horizontalPosition="center"
          paddingSize="none"
          style={{ marginTop: '3rem' }}
        >
          <EuiEmptyPrompt
            layout="horizontal"
            icon={<EuiImage size="fullWidth" src="" alt="" />}
            title={<span>GameCritic</span>}
            body={
              <span>
                The place where individuals connect, converse, and create
                stories together.
              </span>
            }
            paddingSize="l"
            actions={<CallToAction />}
            footer={
              <>
                <EuiTitle size="xxs">
                  <span>Curious? </span>
                </EuiTitle>
                <Link to="#" className="link">
                  Read documentation
                </Link>
              </>
            }
          />
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export default Home;
