"use client";

import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Box, Select, TextField } from "@radix-ui/themes";

export default function SearchInput() {
  return (
    <Box className="grid grid-flow-row gap-2 my-5">
      <Box className="grid grid-cols-2 gap-2">
        <Select.Root defaultValue="hcm">
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value="hcm">Hồ Chí Minh</Select.Item>
              <Select.Item value="hn">Hà Nội</Select.Item>
              <Select.Item value="hue">Huế</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
        <Select.Root defaultValue="quan-1">
          <Select.Trigger />
          <Select.Content>
            <Select.Group>
              <Select.Item value="quan-1">Quận 1</Select.Item>
              <Select.Item value="quan-2">Quận 2</Select.Item>
              <Select.Item value="quan-3">Quận 3</Select.Item>
            </Select.Group>
          </Select.Content>
        </Select.Root>
      </Box>
      <TextField.Root>
        <TextField.Slot>
          <MagnifyingGlassIcon height="16" width="16" />
        </TextField.Slot>
        <TextField.Input placeholder="Nhập tên nhà thờ…" />
      </TextField.Root>
    </Box>
  );
}
