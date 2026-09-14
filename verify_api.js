const { spawn } = require('child_process');
const http = require('http');

const PORT = 3000;
const BASE_URL = `http://localhost:${PORT}`;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function request(method, path, body = null) {
  return new Promise((resolve, reject) => {
    const url = `${BASE_URL}${path}`;
    const parsedUrl = new URL(url);
    
    const options = {
      hostname: parsedUrl.hostname,
      port: parsedUrl.port,
      path: parsedUrl.pathname + parsedUrl.search,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        let json = data;
        try {
          json = JSON.parse(data);
        } catch (e) {}
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: json
        });
      });
    });

    req.on('error', (err) => {
      reject(err);
    });

    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
}

async function runTests() {
  console.log('\n--- Starting API Integration Tests ---');

  // Test 1: Get Initial Products (Seeded)
  console.log('\nTest 1: GET /products (Get all products)');
  const res1 = await request('GET', '/products');
  console.log(`Status: ${res1.statusCode}`);
  console.log('Response:', JSON.stringify(res1.body, null, 2));

  // Test 2: Search Products by Category (Bonus Challenge)
  console.log('\nTest 2: GET /products?category=Electronics (Search by category)');
  const res2 = await request('GET', '/products?category=Electronics');
  console.log(`Status: ${res2.statusCode}`);
  console.log('Response:', JSON.stringify(res2.body, null, 2));

  // Test 3: Sort Products by Price (Bonus Challenge)
  console.log('\nTest 3: GET /products?sort=price&order=DESC (Sort by price DESC)');
  const res3 = await request('GET', '/products?sort=price&order=DESC');
  console.log(`Status: ${res3.statusCode}`);
  console.log('Response:', JSON.stringify(res3.body, null, 2));

  // Test 4: Create Product Validation check (Missing fields)
  console.log('\nTest 4: POST /products with invalid data (Validation Check)');
  const res4 = await request('POST', '/products', {
    name: "",
    price: -10.00,
    category: "",
    stockQuantity: -5
  });
  console.log(`Status: ${res4.statusCode}`);
  console.log('Response:', JSON.stringify(res4.body, null, 2));

  // Test 5: Create Product with Valid Data
  console.log('\nTest 5: POST /products (Create new product)');
  const res5 = await request('POST', '/products', {
    name: "Ultra Wide Monitor",
    price: 349.99,
    category: "Electronics",
    stockQuantity: 15
  });
  console.log(`Status: ${res5.statusCode}`);
  console.log('Response:', JSON.stringify(res5.body, null, 2));
  const newProductId = res5.body.id;

  // Test 6: Get Product by ID
  console.log(`\nTest 6: GET /products/${newProductId} (Get by ID)`);
  const res6 = await request('GET', `/products/${newProductId}`);
  console.log(`Status: ${res6.statusCode}`);
  console.log('Response:', JSON.stringify(res6.body, null, 2));

  // Test 7: Update Product Price
  console.log(`\nTest 7: PUT /products/${newProductId} (Update price of product)`);
  const res7 = await request('PUT', `/products/${newProductId}`, {
    price: 329.99
  });
  console.log(`Status: ${res7.statusCode}`);
  console.log('Response:', JSON.stringify(res7.body, null, 2));

  // Test 8: Delete Selected Product Record
  console.log(`\nTest 8: DELETE /products/${newProductId} (Delete product)`);
  const res8 = await request('DELETE', `/products/${newProductId}`);
  console.log(`Status: ${res8.statusCode}`);
  console.log('Response:', JSON.stringify(res8.body, null, 2));

  // Test 9: Get Deleted Product (Should be 404)
  console.log(`\nTest 9: GET /products/${newProductId} after delete`);
  const res9 = await request('GET', `/products/${newProductId}`);
  console.log(`Status: ${res9.statusCode}`);
  console.log('Response:', JSON.stringify(res9.body, null, 2));

  console.log('\n--- API Integration Tests Finished ---');
}

async function main() {
  console.log('Launching Server...');
  const serverProc = spawn('node', ['server.js'], { stdio: 'inherit' });

  // Wait for server to boot up
  await sleep(3000);

  try {
    await runTests();
  } catch (err) {
    console.error('Test run failed:', err);
  } finally {
    console.log('Killing Server...');
    serverProc.kill();
  }
}

main();
