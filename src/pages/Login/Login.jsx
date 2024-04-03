import {
  PasswordInput,
  Grid,
  Button,
  Center,
  Text,
  Box,
  Group,
  TextInput
} from '@mantine/core';
import {
  IconLock, IconEyeOff, IconEyeCheck, IconUser
} from '@tabler/icons';
import { useForm } from '@mantine/form';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/redux/auth';
import { login } from '@/services/auth';
import PageTransitions from '@/components/PageTransitions';
import { errorNotification, successNotification } from '@/helpers/notification';

function LoginPage() {
  const isAuth = useSelector(state => state.auth.user.token);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const form = useForm({
    initialValues: {
      userName: '',
      password: ''
    },
    validate: {
      username: (value) => (String(value).length > 3 ? null : 'Kullanıcı adı 4 karakterden kısa olamaz'),
      password: (value) => (String(value).length > 3 ? null : 'Şifre 4 karakter kısa olamaz!')
    }
  });

  useEffect(() => {
    if (isAuth) {
      navigate('/');
    }
  }, [isAuth]);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const response = await login(data);
      successNotification({
        message: 'Giriş başarılı!'
      });
      dispatch(setUser(response.data.data.user));
    } catch (err) {
      if (err?.response?.status === 401) {
        errorNotification({
          message: 'Kullanıcı adı veya şifre hatalı!'
        });
        return;
      }
      errorNotification({
        message: 'Bir hata oluştu!'
      });

    } finally {
      setLoading(false);
    }
  };

  return (
    <PageTransitions>
      <Grid style={{ height: '100vh' }} m={0}>
        <Grid.Col md={7} sm={6} xs={12}>

        </Grid.Col>
        <Grid.Col md={5} sm={6} xs={12} m={0} style={{ backgroundColor: '#F1F3F5' }} p={30}>
          <Center style={{ height: '100vh' }}>
            <Center>
              <Box sx={{ width: '90%' }}>
                <div>
                  <Text
                    p={10}
                    sx={
                      (theme) => ({
                        color: theme.colors.blue[6],
                        fontWeight: 'bold',
                        fontSize: '60px'
                      })
                    }
                  >
                    Hoşgeldiniz
                  </Text>
                </div>
                <div>
                  <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
                    <TextInput
                      p={10}
                      icon={<IconUser />}
                      placeholder='Kullanıcı Adı'
                      size='lg'
                      radius='md'
                      {...form.getInputProps('userName')}
                    />
                    <PasswordInput
                      p={10}
                      icon={<IconLock />}
                      placeholder='Şifre'
                      size='lg'
                      radius='md'
                      {...form.getInputProps('password')}
                      visibilityToggleIcon={({ reveal, size }) => (reveal ? <IconEyeOff size={size} /> : <IconEyeCheck size={size} />)}
                    />
                    <Group position='center' p={10}>
                      <Button
                        loading={loading}
                        variant='gradient'
                        gradient={{ from: 'indigo', to: 'cyan' }}
                        px={60}
                        size='md'
                        type='submit'
                      >
                        Giriş yap
                      </Button>
                    </Group>
                  </form>
                </div>
              </Box>
            </Center>
          </Center>
        </Grid.Col>
      </Grid>
    </PageTransitions>
  );
}

export default LoginPage;
