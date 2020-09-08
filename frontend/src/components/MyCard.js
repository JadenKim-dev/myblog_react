import React from "react";
import {Card} from "antd";

export default function Home({title, children}) {
  return(
    <Card title={title} style={{ width: "500px" }}>
      {children}
    </Card>
  )
}