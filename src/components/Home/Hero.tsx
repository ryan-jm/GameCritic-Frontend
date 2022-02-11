import {
  EuiButton,
  EuiEmptyPrompt,
  EuiFlexGroup,
  EuiFlexItem,
  EuiImage,
  EuiLink,
  EuiPage,
  EuiPageBody,
  EuiPageContent,
  EuiText,
  EuiTitle,
} from '@elastic/eui';
import { useNavigate } from 'react-router-dom';

import HeroImg from '../../assets/hero_image.svg';

const Hero = () => {
  const navigate = useNavigate();
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
            icon={<EuiImage size="fullWidth" src={HeroImg} alt="" />}
            title={
              <EuiText textAlign="center">
                <h1>GameCritic</h1>
              </EuiText>
            }
            body={
              <p>The place where individuals discuss the hottest new game releases.</p>
            }
            paddingSize="l"
            actions={
              <EuiFlexGroup justifyContent="center">
                <EuiFlexItem grow={false}>
                  <EuiButton fill onClick={() => navigate('/login')}>
                    Login
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            }
            footer={
              <>
                <EuiTitle size="xxs">
                  <span>Curious? </span>
                </EuiTitle>
                <EuiLink href="https://github.com/ryan-jm/gamecritic-frontend#readme">
                  Read documentation
                </EuiLink>
              </>
            }
          />
        </EuiPageContent>
      </EuiPageBody>
    </EuiPage>
  );
};

export default Hero;
