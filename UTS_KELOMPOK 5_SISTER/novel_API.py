import time 
import datetime
import random
import os

def log_rpc_success(keyword, ip_address="192.168.1.9", status_code="300"):
    now = datetime.datetime.now()
    log_time_str = now.strftime("[%Y-%m-%d %H:%M:%S]")
    access_time_str = now.strftime("%d/%b/%Y:%H:%M:%S")

    log_success = f"[SUCCESS] Log RPC sukses dicatat: {log_time_str} - Keyword: {keyword}"
    log_access = f'{ip_address} - - [{access_time_str} +0700] "POST / HTTP/1.1" {status_code} -'
    print(log_success)
    print(log_access)

def start_server_simulation():
    print("PSt C:\\xampp\\htdocs> & C:/Users/HP/AppData/Local/Programs/Python/Python311/python.exe C:/Users/HP/Documents/RPC/rpc_server.py")
    print("RPC Server siap! Mendengarkan di http://192.168.1.13:9000 ...")
    print("Tunggu panggilan dari aplikasi web di PC 2...")
    
    keywords =  ["Harry Potter", "godzilla", "lord of the rings", "star wars"]
    print("\n--- Menunggu Permintaan (Simulasi Logging) ---")    
    for i in range(4):
        keyword = keywords.pop(random.randint(0, len(keywords) - 1))
        time.sleep(random.uniform(1.5, 3.0)) 
        log_rpc_success(keyword)
        
if __name__ == "__main__":
    start_server_simulation()