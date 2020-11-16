import React, { useState, useCallback } from "react";
import { Tabs, Card, Button, Icon } from "@shopify/polaris";
import NotificationSettings from "./NotificationSettings";
import ManualSale from "./ManualSale";
import RealtimeSettings from "./RealtimeSettings";
import Test from "../Test";
import { QuestionMarkMajor } from "@shopify/polaris-icons";
const Views = () => {
  const [selected, setSelected] = useState(1);

  const handleTabChange = useCallback(
    (selectedTabIndex) => setSelected(selectedTabIndex),
    []
  );

  const tabs = [
    {
      id: "all-customers",
      content: "Notification Settings",
      accessibilityLabel: "All customers",
      panelID: "all-customers-content",
      component: <NotificationSettings />,
    },
    {
      id: "accepts-marketing",
      content: "Manual Sale",
      panelID: "accepts-marketing-content",
      component: <ManualSale />,
    },
    {
      id: "repeat-customers",
      content: "Realtime Watching Settings",
      panelID: "repeat-customers-content",
      component: <RealtimeSettings />,
    },
    {
      id: "repeat-customers1",
      content: "Test",
      panelID: "repeat-customers-content1",
      component: <Test />,
    },
  ];
  return (
    <div className="mt-3">
      <Card>
        <Tabs tabs={tabs} selected={selected} onSelect={handleTabChange}>
          <Card.Section>
            <div>{tabs[selected].component}</div>
          </Card.Section>
        </Tabs>
        <div style={{ position: "fixed", bottom: "20px", left: "15px" }}>
          <Button size="medium" primary>
            <div style={{ display: "flex" }}>
              <Icon source={QuestionMarkMajor} />
              <span style={{ padding: "4px 0px 4px 3px" }}>Support</span>
            </div>
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Views;
