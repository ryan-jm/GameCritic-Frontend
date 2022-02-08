import { EuiButton, EuiFieldText, EuiFlexGroup, EuiFlexItem, EuiSpacer } from '@elastic/eui';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const CallToAction = () => {
  const [input, setInput] = React.useState<string>('');
  const [buttonDisabled, setButtonDisabled] = React.useState<boolean>(true);
  const navigator = useNavigate();

  const handleChange = (event: any) => {
    const { valid } = event.target.validity;
    if (valid) {
      setButtonDisabled(() => false);
    }
    setInput(() => event.target.value);
  };

  return (
    <EuiFlexGroup
      justifyContent="center"
      alignItems="center"
      direction="column"
    >
      <EuiSpacer />
      <EuiFieldText
        placeholder="Enter your email"
        value={input}
        onChange={handleChange}
        icon="email"
        fullWidth
        type="email"
      />

      <EuiFlexItem grow={false}>
        <div>
          <EuiButton
            color="primary"
            fill
            disabled={buttonDisabled}
            onClick={() => navigator('/sign-up')}
          >
            Get started
          </EuiButton>
        </div>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export default CallToAction;
