import {
  Header, Image, Avatar, Menu
} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { IconLogout, IconUser } from '@tabler/icons';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuth } from '@/redux/auth';

function CustomHeader() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  return (
    <Header height={70} p='md'>
      <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
        <Menu style={{ position: 'absolute', top: 5, right: 0 }} shadow='md' width={200}>
          <Menu.Target>
            <Avatar style={{ float: 'right' }} mr='xl' mt='sm' radius='xl' />
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Item icon={<IconUser size={14} />}>{user.userName}</Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color='red'
              onClick={
                () => {
                  dispatch(clearAuth());
                  navigate('/login');
                }
              }
              icon={<IconLogout size={14} />}
            >
              Çıkış Yap
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </div>
    </Header>
  );
}

export default CustomHeader;
