import { EuiButton, EuiButtonEmpty, EuiEmptyPrompt, EuiImage } from '@elastic/eui';
import { useNavigate } from 'react-router-dom';

import NotFound from '../../assets/404.svg';

const Error = () => {
  const navigate = useNavigate();

  return (
    <EuiEmptyPrompt
      style={{ marginTop: '5rem' }}
      icon={<EuiImage size="fullWidth" src={NotFound} alt="" />}
      title={<h2>Page not found</h2>}
      layout="vertical"
      body={
        <p>
          The page you are looking for might have been removed or temporarily unavailable.
        </p>
      }
      actions={[
        <EuiButton color="accent" fill onClick={() => navigate('/')}>
          Go home
        </EuiButton>,
        <EuiButtonEmpty iconType="arrowLeft" flush="left" onClick={() => navigate(-1)}>
          Go back
        </EuiButtonEmpty>,
      ]}
    />
  );
};

export default Error;
