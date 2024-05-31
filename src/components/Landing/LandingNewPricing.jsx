import {
  Flex,
  Card,
  Heading,
  Text,
  Divider,
  Badge,
  Button,
} from '@aws-amplify/ui-react';

export function LandingNewPricing() {
  const paddle = window.Paddle;

  const oneTimePayment = () => {
    paddle.Checkout.open({ product: 846233 });
  };

  const monthlyPayment = () => {
    paddle.Checkout.open({ product: 846939 });
  };

  return (
    <Flex
      direction="column"
      width="100%"
      height="100%"
      backgroundColor="#34548c"
      alignItems="center"
      alignContent="center"
    >
      <Card
        width="80%"
        variation="elevated"
        height="80%"
        marginTop="100px"
        marginBottom="100px"
      >
        <Flex direction="column" width="100%" alignItems="center">
          <Flex width="100%" direction="row" justifyContent="center">
            <Card variation="outlined" width="40%">
              <Flex width="100%" direction="column" alignItems="center">
                <Heading level="4" textAlign="center">
                  Initial Sign Up Fee
                </Heading>
                <Divider />
                <Text textAlign="center">
                  The initial sign up fee is to be paid by an affiliate before
                  they can access Habitat App. This fee covers cost of
                  development and the initial license key for the affiliate.
                  This is a one time payment. Once paid, an affiliate now has
                  access to:
                  <ul>
                    <li>Access to Habitat App</li>
                    <li>Unlimited application cycles</li>
                    <li>Unlimited admin users</li>
                    <li>Customer Service</li>
                    <li>Constant updates and new features</li>
                  </ul>
                </Text>
                <Badge width="fit-content" variation="success">
                  <Heading level="5" textAlign="center">
                    $2000.00
                  </Heading>
                </Badge>
                <Button
                  variation="primary"
                  onClick={() => {
                    oneTimePayment();
                  }}
                >
                  Buy now
                </Button>
              </Flex>
            </Card>
            <Card variation="outlined" width="40%">
              <Flex width="100%" direction="column" alignItems="center">
                <Heading level="4" textAlign="center">
                  Monthly Maintenance Fee
                </Heading>
                <Divider />
                <Text textAlign="center">
                  The monthly maintenance fee is the cost for maintaining
                  Habitat App's development, maintenance and constant update
                  with new features and error fixes. This is a monthly payment.
                  Once paid, an affiliate now has access to:
                  <ul>
                    <li>Access to Habitat App</li>
                    <li>Unlimited application cycles</li>
                    <li>Unlimited admin users</li>
                    <li>Customer Service</li>
                    <li>Constant updates and new features</li>
                  </ul>
                </Text>
                <Badge width="fit-content" variation="success">
                  <Heading level="5" textAlign="center">
                    $100.00 / month
                  </Heading>
                </Badge>
                <Button
                  variation="primary"
                  onClick={() => {
                    monthlyPayment();
                  }}
                >
                  Buy now
                </Button>
              </Flex>
            </Card>
          </Flex>
        </Flex>
      </Card>
    </Flex>
  );
}
