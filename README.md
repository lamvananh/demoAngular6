# demoAngular
this is an example of using AngularJS6 with socketIO and material control

Hướng dẫn cài đăt:
1. clone respository 
git clone https://github.com/lamvananh/demoAngular6.git
2. duyệt CMD tới thư mục đã tải về

3. cài các module cho client: duyệt CMD tới thư mục client và chạy lệnh:

	npm install       
4.Cài các module cho server: duyệt CMD tới thư mục "server" và chạy lệnh:

	npm install
Vui lòng đợi đến khi quá trình cài đặt hoàn tất.

Hướng dẫn buid server:

	1.duyệt cmd tới thư mục "server"
        
	2. chạy lệnh sau để build:
        
		gulp build
                
	3.duyệt CMD vào thư mục "dist"
        
		cd dist
                
	4.Chạy lệnh để start server:
        
		node index.js
                
Hướng dẫn buid client:

	1. Duyệt CMD tới thư mục "client"
        
		cd client
                
	2. chạy lệnh sau để chạy:
        
		ng serve 
                
	3. Mở trình duyệt và duyệt tới trang "localhost:4200"
        
Chú ý: Để tránh các thiết lập phức tạp không càn thiết cho mục đích demo, vui lòng đảm bảo cổng 8080 và 4200 hiện tại đang không bị sử dụng.
	   Mọi chi tiết xin vui lòng liên hệ qua địa chỉ email: lamanh.blog@gmail.com
