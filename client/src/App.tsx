import React, { useState, useEffect } from "react";
import "./App.css";
import {
  Input,
  Space,
  Layout,
  Avatar,
  Typography,
  Divider,
  Button,
  Table,
} from "antd";
import { UserOutlined } from "@ant-design/icons";
import axios from "./util/axios";

const { Sider, Header, Content } = Layout;
const { Text } = Typography;

type Food = {
  name: string;
  category?: string;
  nutritionalInfo?: {
    calories: number;
    portion: number;
  };
};

type FoodData = {
  data: Food[];
};

const getFood = async (name: string) => {
  try {
    const res = await axios.get<FoodData>(`food/${name}`);
    return res;
  } catch (e) {
    console.log(e);
    throw new Error("No se ha encontrado el alimento");
  }
};

const user = {
  name: "Claudio",
  lastName: "Lillo",
  age: 32,
  weight: 78,
  height: 175,
};

const getIMC = (height: number, weight: number) =>
  Math.round((100 * weight) / ((height * height) / 10000)) / 100;

const columns = [
  {
    title: "Alimento",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "Categoría",
    dataIndex: "category",
    key: "category",
  },
  {
    title: "Calorías/100g",
    dataIndex: "calories",
    key: "calories",
  },
];

function App() {
  const [food, setFood] = useState<Food[]>([]);

  const handleSearch = async (value: string) => {
    try {
      console.log("food: ", food);
      const res = await getFood(value);
      console.log(res.data.data);
      setFood(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    console.log("render");
  }, [food]);

  return (
    <Layout>
      <Sider>
        <Space
          align="center"
          style={{
            textAlign: "center",
            width: "100%",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <Avatar shape="square" size={64} icon={<UserOutlined />} />
        </Space>
        <Space
          align="center"
          style={{ justifyContent: "center", width: "100%", marginTop: "30px" }}
        >
          <Text
            style={{
              color: "white",
              justifyContent: "center",
              textAlign: "center",
            }}
          >{`${user.name} ${user.lastName}`}</Text>
        </Space>
        <Space
          align="center"
          style={{ justifyContent: "center", width: "100%", marginTop: "20px" }}
        >
          <Text
            style={{
              color: "white",
              justifyContent: "center",
              textAlign: "center",
            }}
          >{`${user.age} años`}</Text>
        </Space>
        <Space
          align="center"
          style={{ justifyContent: "center", width: "100%", marginTop: "20px" }}
        >
          <Text
            style={{
              color: "white",
              justifyContent: "center",
              textAlign: "center",
            }}
          >{`${user.weight} Kg`}</Text>
        </Space>
        <Space
          align="center"
          style={{ justifyContent: "center", width: "100%", marginTop: "20px" }}
        >
          <Text
            style={{
              color: "white",
              justifyContent: "center",
              textAlign: "center",
            }}
          >{`${user.height} cm`}</Text>
        </Space>
        <Space
          align="center"
          style={{ justifyContent: "center", width: "100%", marginTop: "20px" }}
        >
          <Text
            style={{
              color: "white",
              justifyContent: "center",
              textAlign: "center",
            }}
          >{`IMC = ${getIMC(user.height, user.weight)}`}</Text>
        </Space>
      </Sider>
      <Layout>
        <Header>
          <Divider type="vertical" />
          <Button type="link" href="recetas">
            Recetas
          </Button>
          <Divider type="vertical" />
          <Button type="link" href="alimentos">
            Alimentos
          </Button>
          <Divider type="vertical" />
          <Button type="link" href="calculadora">
            Calculadora
          </Button>
        </Header>
        <Content style={{ padding: 30 }}>
          <Space style={{ width: 300, border: 1 }}>
            <Input.Search
              size="large"
              placeholder="Nombre del alimento"
              onSearch={handleSearch}
            />
          </Space>
          <Space>
            <Button>Crear Nuevo Alimento</Button>
          </Space>
          <Divider />
          <Space>
            {food && food.length > 0 && (
              <Table
                dataSource={food.map(
                  ({ name, category, nutritionalInfo }, index) => ({
                    key: index,
                    name,
                    category,
                    calories: nutritionalInfo?.calories,
                  })
                )}
                columns={columns}
              />
            )}
          </Space>
        </Content>
      </Layout>
    </Layout>
  );
}

export default App;
