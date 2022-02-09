import { EuiCard, EuiFlexItem, EuiLoadingContent, EuiSpacer } from '@elastic/eui';

const LoadingCard = () => {
  return (
    <EuiFlexItem>
      <EuiCard
        textAlign="left"
        title={
          <>
            <EuiLoadingContent lines={4} />
            <EuiSpacer size="xl" />
          </>
        }
        description={<EuiLoadingContent lines={8} />}
      />
    </EuiFlexItem>
  );
};

export default LoadingCard;
