'use client'

import MainLayout from "@/components/layouts/MainLayout";
import MainBreadcrumb from "@/components/layouts/main-breadcrumb/MainBreadcrumb";
import { FloorsLabels } from "@/interfaces/classes/ClassesType";
import { useGetReservations } from "@/services/reservations/reservation-api";
import { Card, Carousel, Flex, Image, Layout, Typography } from "antd";
import { usePathname } from "next/navigation";
import React from "react";
import styled from "styled-components";

const DashboardContent = styled(Layout)`
  height: 100vh;
`;

const CardsArea = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
`;

const CustomCarousel = styled(Carousel)`
  background-color: var(--color-blue);
  width: 150vh;
  height: 75vh;
  border-radius: 10px;
  margin-top: 2em;
`;

const CustomContent = styled(Flex)`
  h1 {
    color: white;
  }
`;

const CardsContent = styled(Flex)`
  margin: 2em;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 2em;
`;

const Dashboard = () => {
  const pathname = usePathname();
  const { reservations } = useGetReservations();

  const [ filteredReservations, setFilteredReservations ] = React.useState(
    reservations?.filter(reservation => {
      const reservationDate = new Date(reservation.dateStart);
      const today = new Date();
      return reservationDate.getDate() === today.getDate() && 
        reservationDate.getMonth() === today.getMonth() && 
        reservationDate.getFullYear() === today.getFullYear() &&
        reservation.isCompleted === true;
    }
  )
  );

  const groupedByFloor = (filteredReservations || []).reduce<{ [key: number]: typeof filteredReservations }>((acc, reservation) => {
    const floor = reservation.class.floor;
    if (!acc[floor]) {
      acc[floor] = [];
    }
    acc[floor]!.push(reservation);
    return acc;
  }, {})

  const floors: number[] = Object.keys(groupedByFloor).map(Number);

  return (
    <MainLayout>
      <DashboardContent>
        <MainBreadcrumb path={pathname}></MainBreadcrumb>
        <CardsArea>
          <Image
            width={120}
            src="/images/senac-logo.png"
            preview={false}
            alt="Logo Senac" />
          <CustomCarousel autoplay autoplaySpeed={5000}>
            {floors?.map((key) => (
              <CustomContent key={key}>
                <Typography.Title style={{ padding: '1em 1em 0 1em' }}>{FloorsLabels[key]}</Typography.Title>
                <CardsContent>
                  {(groupedByFloor[key] || []).map((reservation) => (
                    <Card.Grid key={key}>
                      <Card style={{ minWidth: '250px' }}>
                        <Card.Meta
                          title={reservation.class.name}
                          description={
                            <div style={{ color: 'gray' }}>
                              <strong>{reservation.title}</strong>
                              <p>Docente: {reservation.owner}</p>
                            </div>
                          }
                        />
                      </Card>
                    </Card.Grid>
                  ))}
                </CardsContent>
              </CustomContent>
            ))}
          </CustomCarousel>
        </CardsArea>
      </DashboardContent>
    </MainLayout>
  );
}

export default Dashboard;