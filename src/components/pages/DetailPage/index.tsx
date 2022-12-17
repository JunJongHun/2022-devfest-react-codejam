import { AppScreen } from '@stackflow/plugin-basic-ui';
import React, { useState, useEffect } from 'react';
import { DetailPageBackButton } from 'src/components/common/Stackflow';
import { ProductInterface, UserInterface } from 'src/schemas/Product';
import { getProductData } from 'src/services/product';
import { getUserData } from 'src/services/user';
import { useFlow } from 'src/utils/stackflow';
import styled from 'styled-components';
import OtherItems from './components/OtherItems';
import ProductDetail from './components/ProductDetail';
import UserProfile from './components/UserProfile';

type DetailParams = {
  params: {
    id: string;
  };
};

const DetailPage: React.FC<DetailParams> = ({ params: { id } }) => {
  const { pop } = useFlow();
  const [product, setProduct] = useState<ProductInterface>();
  const [user, setUser] = useState<UserInterface>();
  const loadData = async () => {
    const { data } = await getProductData(Number(id));
    setProduct(data);

    const { data: userData } = await getUserData(data.userID);
    setUser(userData);
  };

  useEffect(() => {
    loadData();
  }, []);
  return (
    <AppScreen
      appBar={{
        backButton: {
          render: () => <DetailPageBackButton onClick={pop} />,
        },
      }}
    >
      {product && user && (
        <section>
          <ProductImageWrapper>
            <img src={product.img} alt="productImg" />
          </ProductImageWrapper>
          <UserProfile {...user}></UserProfile>
          <ProductDetail {...product}></ProductDetail>
          <OtherItems userName={user.userName} other={user.other}></OtherItems>
        </section>
      )}
    </AppScreen>
  );
};

export default DetailPage;

const ProductImageWrapper = styled.span`
  width: 100%;
  height: 100%;
  display: inline-block;
`;
