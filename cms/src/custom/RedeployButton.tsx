import React, { useState } from "react";
import { Button } from "payload/components/elements";
import { toast } from "react-toastify";

const RedeployButton = () => {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    if (isLoading) return;

    setIsLoading(true);

    const res = await fetch("/api/redeploy", {
      method: "POST",
    });

    if (!res.ok || res.status !== 200) {
      toast.error("Failed to start redeploying the website.");
    } else {
      toast.success("Started redeploying the website.");
    }

    setIsLoading(false);
  };

  return (
    <Button onClick={handleClick} type="button" size="small" buttonStyle="secondary">
      Redeploy
    </Button>
  );
};

export default RedeployButton;
