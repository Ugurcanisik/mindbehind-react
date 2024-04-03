import {
  Button,
  Grid,
  Group,
  Card,
  Title,
  TextInput
} from '@mantine/core';
import { useEffect, useState } from 'react';
import useBranchDetail from '@/hooks/useBranchDetail';
import { useNavigate, useParams } from 'react-router-dom';
import { errorNotification, successNotification } from '@/helpers/notification';
import { joiResolver, useForm } from '@mantine/form';
import Joi from 'joi';
import PageTransitions from '@/components/PageTransitions';
import CustomLoadingOverlay from '@/components/CustomLoadingOverlay';
import { updateBranch } from '@/services/branch';

const schema = Joi.object({
  name: Joi.string().required().messages({
    'string.empty': 'Şube Adı boş bırakılamaz'
  }),
  latitude: Joi.number().required().messages({
    'number.empty': 'latitude boş bırakılamaz'
  }),
  longitude: Joi.number().required().messages({
    'string.empty': 'longitude boş bırakılamaz'
  }),
  phone: Joi.string().required().messages({
    'string.empty': 'Telefon numarası boş bırakılamaz'
  }),
  fullAddress: Joi.string().required().messages({
    'string.empty': 'Adres boş bırakılamaz'
  })
});

const BranchDetail = () => {
  const { branchNumber } = useParams();
  const navigate = useNavigate();

  if (!branchNumber) { navigate('/branches') }

  const {
    data: branchDetail,
    fetching
  } = useBranchDetail(branchNumber);

  const [loading, setLoading] = useState(false)

  const form = useForm({
    initialValues: {
      name: '',
      latitude: '',
      longitude: '',
      phone: '',
      fullAddress: ''
    },
    validate: joiResolver(schema)
  });

  useEffect(() => {
    if (branchDetail.name) {
      form.setValues({
        name: branchDetail.name,
        latitude: branchDetail.latitude,
        longitude: branchDetail.longitude,
        phone: branchDetail.phone,
        fullAddress: branchDetail.fullAddress
      })
    }
  }, [branchDetail])

  const onSubmit = async (values) => {
    try {
      setLoading(true);
      await updateBranch(branchNumber, values);
      successNotification({
        message: 'Branch updated successfully.'
      });
    } catch (err) {
      errorNotification({
        message: 'Error'
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <PageTransitions>
      <form onSubmit={form.onSubmit((values) => onSubmit(values))}>
        <Card shadow='sm' radius='1em' mt='lg' withBorder>
          <CustomLoadingOverlay visible={fetching || loading} />
          <Title order={3} mb='xl'>Şube Bilgisi Güncelle</Title>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                description='Şube Adı'
                {...form.getInputProps('name')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                description='Şube Adresi'
                {...form.getInputProps('fullAddress')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                description='Şube Telefon Numarası'
                {...form.getInputProps('phone')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                description='Şube Latitude'
                {...form.getInputProps('latitude')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                description='Şube Longitude'
                {...form.getInputProps('longitude')}
              />
            </Grid.Col>
          </Grid>
        </Card>
        <Group position='center' mb='lg'>
          <Button loading={loading} type='submit' mt='lg' style={{ width: '15em' }}>
            Güncelle
          </Button>
        </Group>
      </form>
    </PageTransitions>
  )
}

export default BranchDetail;
