import smtplib
from email.mime.text import MIMEText

# Thay các thông tin sau bằng thông tin thực của bạn
sender_email = '21522540@gm.uit.edu.vn'      
sender_password = 'Quynh_10102002'          
to_email = 'ttminhquynh@gmail.com'   

def send_email(subject, body):
    msg = MIMEText(body)
    msg['Subject'] = subject
    msg['From'] = sender_email
    msg['To'] = to_email

    try:
        # Thiết lập kết nối với máy chủ SMTP của Gmail
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(sender_email, sender_password)

        server.sendmail(sender_email, to_email, msg.as_string())
        return 1
    except Exception as e:
        return (f'Failed to send email. Error: {str(e)}')
    finally:
        server.quit()

