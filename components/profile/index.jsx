import { useState } from "react";
import { Box, Button, Paper, Tab, Tabs, Typography } from "@mui/material";
import PaymentIcon from "@mui/icons-material/Payment";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { TabContext, TabPanel } from "@mui/lab";
import { UserInfo, Payment } from "@/components";
export const Profile = () => {
  const [value, setValue] = useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Paper sx={{ padding: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography>نام کاربری</Typography>
        <Button color="error" variant="outlined">
          خروج از حساب
        </Button>
      </Box>
      <Box sx={{ marginTop: "10px" }}>
        <TabContext value={value}>
          <Tabs
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            
            aria-label="icon label tabs example"
          >
            <Tab icon={<AccountCircleIcon />}  label="حساب کاربری" value="1" />
            <Tab icon={<PaymentIcon />} label="تراکنش ها" value="2" />
          </Tabs>
          <TabPanel value="1">
            <UserInfo />
          </TabPanel>
          <TabPanel value="2">
            <Payment />
          </TabPanel>
        </TabContext>
      </Box>
    </Paper>
  );
};
