import { Box, Card, Flex, Link, ScrollArea, Text } from "@radix-ui/themes";

export default function ResultBox() {
  return (
    <>
      <ScrollArea
        size="1"
        scrollbars="vertical"
        style={{ height: "calc(100svh - 180px)" }}
      >
        {Array(10)
          .fill("")
          .map(() => (
            <Card className="mb-2 hover:bg-gray-50">
              <Flex gap="3" align="start">
                <Box className="gap-3">
                  <Text as="div" size="3" weight="bold">
                    Nhà thờ Bình Hải
                  </Text>
                  <Text as="div" size="1" color="gray">
                    P. Tân Tiến, Biên Hòa, Đồng Nai
                  </Text>
                  <Box className="flex flex-col py-2">
                    <Text size="2">Ngày thường: 04h30, 18h00</Text>
                    <Text size="2">Thứ Bảy: 04h30, 18h00</Text>
                    <Text size="2">Chúa Nhật: 04h30, 07h00, 18h00</Text>
                  </Box>
                  <Link size="1" underline="always">
                    Góp ý thông tin
                  </Link>
                </Box>
              </Flex>
            </Card>
          ))}
      </ScrollArea>
    </>
  );
}
