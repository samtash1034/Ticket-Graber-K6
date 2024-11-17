# K6 搶票系統 - 壓力測試腳本

## 先決條件

### 1. 安裝 K6

請確保已安裝 K6。請參考 [K6 官方安裝指南](https://k6.io/docs/get-started/installation/) 進行安裝。

### 2. API 端點

確保 API 端點（`http://localhost:8080/api/ticket/grab`）可正常存取，並準備好接受測試請求。

## clone 專案

```txt
git clone https://github.com/samtash1034/Ticket-Graber-K6.git
cd Ticket-Graber-K6
```

## 執行腳本

使用以下指令執行 K6 腳本：

```txt
k6 run script.js
```

## 腳本概述

提供的 K6 腳本模擬了一個高負載的搶票情境。它每秒發送 1,500 次請求，持續 10 秒，旨在測試系統處理高併發的能力。

### 主要參數：

- **速率**：每秒 1,500 次請求。
- **持續時間**：10 秒。
- **虛擬使用者（VUs）**：預先分配 1,000 個虛擬使用者，最大上限為 2,000。
- **閾值**：95% 的請求必須在 1,000 毫秒內完成。
