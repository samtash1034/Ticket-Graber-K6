import http from "k6/http";
import { sleep, check } from "k6";

export const options = {
  scenarios: {
    grab_tickets: {
      executor: "constant-arrival-rate",
      rate: 1500, // 每秒發送1,500次請求
      timeUnit: "1s", // 速率的時間單位
      duration: "10s", // 持續時間為10秒
      preAllocatedVUs: 1000, // 預先分配1,000個虛擬用戶
      maxVUs: 2000, // 最大虛擬用戶數量
    },
  },
  thresholds: {
    http_req_duration: ["p(95)<1000"], // 95%的請求耗時小於1000ms
  },
};

export default function () {
  const url = "http://localhost:8080/api/ticket/grab";
  // 這邊給 null 沒關係，後端已寫好邏輯去分配座位區域以及數量
  const payload = JSON.stringify({
    concertId: 1,
    seatArea: null,
    quantity: null,
  });

  const params = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const res = http.post(url, payload, params);

  check(res, {
    "is status 200": (r) => r.status === 200,
  });

  sleep(1); // 可根據需求調整或移除
}
